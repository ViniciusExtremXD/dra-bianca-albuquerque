// QA visual: abre o site num Edge/Chrome headless separado (perfil temporário), nas larguras 320/360/390/1440,
// confere rolagem horizontal, alvos de toque < 44 px e erros no console, e salva capturas em qa/.
// Uso: npm run preview (em outro terminal) e depois `node scripts/qa-shots.mjs [url]`.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const URL_BASE = process.argv[2] || "http://localhost:5182/";
const OUT = path.resolve("qa");
const PORT = 9339;
const BROWSERS = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
];
const exe = BROWSERS.find((p) => fs.existsSync(p));
if (!exe) throw new Error("Edge/Chrome não encontrado");
fs.mkdirSync(OUT, { recursive: true });

const profile = fs.mkdtempSync(path.join(os.tmpdir(), "qa-bianca-"));
const proc = spawn(exe, [`--remote-debugging-port=${PORT}`, "--headless=new", "--disable-gpu", "--hide-scrollbars", `--user-data-dir=${profile}`, "--no-first-run", "about:blank"], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    wsUrl = list.find((t) => t.type === "page")?.webSocketDebuggerUrl;
  } catch {}
  if (!wsUrl) await sleep(200);
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
const logs = [];
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  } else if (msg.method === "Runtime.exceptionThrown") {
    logs.push(`EXCEPTION ${msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text}`);
  } else if (msg.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(msg.params.type)) {
    logs.push(`console.${msg.params.type}: ${msg.params.args.map((a) => a.value ?? a.description).join(" ")}`);
  } else if (msg.method === "Log.entryAdded" && ["error", "warning"].includes(msg.params.entry.level)) {
    logs.push(`log.${msg.params.entry.level}: ${msg.params.entry.text} ${msg.params.entry.url ?? ""}`);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const mid = ++id;
    pending.set(mid, (m) => (m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)));
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
const evalJs = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result.value;

await send("Page.enable");
await send("Page.bringToFront");
await send("Runtime.enable");
await send("Log.enable");
// Sem aviso de cookies nas capturas
await send("Page.addScriptToEvaluateOnNewDocument", { source: "try{localStorage.setItem('bianca-consent','denied')}catch(e){}" });

async function shot(name) {
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(OUT, `${name}.png`), Buffer.from(data, "base64"));
  return `qa/${name}.png`;
}

async function scrollTo(selector, offset = 0) {
  await evalJs(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); const y = el.getBoundingClientRect().top + window.scrollY - ${offset}; window.scrollTo(0, y); })()`);
  // rolagem em etapas para disparar os "whileInView" de tudo que passou pela tela
  await sleep(3400);
}

const CHECKS = `(() => {
  const vw = document.documentElement.clientWidth;
  const overflow = document.documentElement.scrollWidth - vw;
  const wide = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.right > vw + 1 || r.left < -1) {
      // ignora o que está dentro de um ancestral que corta (overflow hidden/clip)
      let p = el.parentElement, clipped = false;
      while (p && p !== document.body) { const cs = getComputedStyle(p); if (/(hidden|clip)/.test(cs.overflowX)) { const pr = p.getBoundingClientRect(); if (pr.right <= vw + 1 && pr.left >= -1) { clipped = true; break; } } p = p.parentElement; }
      if (!clipped) wide.push((el.id ? '#' + el.id : el.tagName.toLowerCase()) + '.' + String(el.className).slice(0, 60) + ' [' + Math.round(r.left) + ',' + Math.round(r.right) + ']');
    }
  }
  const small = [];
  for (const el of document.querySelectorAll('a[href], button')) {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (r.width === 0 || cs.visibility === 'hidden' || el.closest('[aria-hidden=true]')) continue;
    if (r.height < 44 || r.width < 44) small.push((el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
  }
  return { vw, overflow, wide: wide.slice(0, 12), small };
})()`;

const report = [];
// Movimento completo para todos (RESPECT_REDUCED_MOTION = false), então basta uma passada.
for (const motion of ["no-preference"]) {
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: motion }] });
  const widths = motion === "reduce" ? [390, 1440] : [320, 360, 390, 1440];
  for (const w of widths) {
    const mobile = w < 768;
    const h = mobile ? 780 : 900;
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, mobile });
    await send("Page.bringToFront");
    await send("Page.navigate", { url: URL_BASE });
    await sleep(6000); // abertura + entrada do hero
    const tag = `${w}${motion === "reduce" ? "-calmo" : ""}`;
    const files = [await shot(`hero-${tag}`)];
    // percorre a página inteira devagar (dispara as animações de entrada) e mede no fim
    await evalJs(`(async () => { for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.6) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 140)); } })()`);
    await sleep(800);
    const checks = await evalJs(CHECKS);
    if (motion === "no-preference" && (w === 390 || w === 1440)) {
      for (const [sel, name, off] of [
        ["#sobre", "sobre", -10],
        ["#missao", "missao", 40],
        ["#atendimentos", "atendimentos", 40],
        ["#atendimentos ul", "atendimentos-lista", 120],
        ["#historia", "historia", 40],
        ["#historia ol", "historia-linha", 160],
        ["#consultorio", "consultorio", 40],
        ["#duvidas", "duvidas", 40],
        ["#contato", "contato", 40],
        ["footer", "rodape", 0],
      ]) {
        try {
          await scrollTo(sel, off);
          files.push(await shot(`${name}-${tag}`));
        } catch (e) {
          files.push(`falhou ${name}: ${e.message}`);
        }
      }
    }
    report.push({ width: w, motion, ...checks, files });
  }
}

fs.writeFileSync(path.join(OUT, "qa-report.json"), JSON.stringify({ url: URL_BASE, report, console: [...new Set(logs)] }, null, 2));
console.log(JSON.stringify({ report: report.map(({ files, ...r }) => ({ ...r, shots: files.length })), console: [...new Set(logs)] }, null, 2));
ws.close();
proc.kill();
await sleep(500);
try {
  fs.rmSync(profile, { recursive: true, force: true });
} catch {}
