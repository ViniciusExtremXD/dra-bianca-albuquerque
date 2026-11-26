import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { InstagramLogo, List, WhatsappLogo, X } from "@phosphor-icons/react";
import { DOCTOR, NAV_LINKS, assetUrl, pushEvent } from "../data/site";
import { lockScroll } from "../lib/smooth-scroll";
import { EASE_IN_OUT, EASE_OUT, EASE_SOFT } from "./motion";
import { InstagramLink, WhatsAppLink } from "./cta";
import { Monogram, Wordmark } from "./brand";

/* ───────────── Abertura: o arco do monograma se desenha, as letras acendem e a cortina sobe em arco ───────────── */

function introAlreadyPlayed() {
  try {
    return sessionStorage.getItem("bianca-intro") === "1";
  } catch {
    return false;
  }
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) return;
    lockScroll(true);
    const quick = introAlreadyPlayed();
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("bianca-intro", "1");
      } catch {
        /* armazenamento bloqueado: a abertura completa toca de novo */
      }
      setShow(false);
      onDone();
    }, quick ? 350 : 2100);
    // Rede de segurança: se a animação de saída não terminar (aba em segundo plano, navegador travado),
    // a rolagem é liberada mesmo assim. O CSS (.bianca-preloader) também some sozinho depois de 6 s.
    const safety = setTimeout(() => {
      if (document.querySelector(".bianca-preloader")) lockScroll(false);
    }, 7000);
    return () => {
      clearTimeout(t);
      clearTimeout(safety);
    };
  }, [show, onDone]);

  return (
    <AnimatePresence onExitComplete={() => lockScroll(false)}>
      {show && (
        <motion.div
          className="bianca-preloader fixed inset-0 z-[100] grid place-items-center bg-rose-100"
          initial={{ clipPath: "ellipse(160% 160% at 50% 0%)" }}
          exit={{ clipPath: "ellipse(160% 0% at 50% 0%)" }}
          transition={{ duration: 1.1, ease: EASE_IN_OUT }}
        >
          <div className="glow absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 [--glow-a:0.9] [--glow:250_247_243]" />
          <div className="relative flex flex-col items-center px-6 text-center">
            <Monogram draw className="h-28 w-auto sm:h-32" strokeWidth={1.2} title={DOCTOR.name} />
            <motion.p
              className="font-display mt-6 text-2xl text-rose-700 sm:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: EASE_SOFT }}
            >
              Dra. Bianca <span className="italic">Albuquerque</span>
            </motion.p>
            <motion.p
              className="mt-2 text-xs font-medium tracking-[0.18em] text-rose-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              GINECOLOGIA E OBSTETRÍCIA
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────── Barra de progresso fininha no topo ───────────── */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-rose-300 via-rose-400 to-rose-600" />;
}

/* ───────────── Navegação ───────────── */

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > prev && y > 520 && !open);
  });

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 sm:px-5 sm:pt-3"
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE_SOFT }}
      >
        <nav
          className={`mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-2 rounded-[26px] border border-white/80 px-2 pl-3 backdrop-blur-md transition-[background-color,box-shadow] duration-700 sm:h-[72px] sm:px-3 sm:pl-4 ${
            solid ? "bg-cream-50/90 shadow-lift" : "bg-cream-50/60 shadow-soft"
          }`}
          aria-label="Principal"
        >
          <a href="#topo" className="flex min-w-0 items-center rounded-2xl" aria-label={`${DOCTOR.name}, ${DOCTOR.title}, ${DOCTOR.registry}: início`}>
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative flex h-11 items-center overflow-hidden whitespace-nowrap rounded-full px-3.5 text-[15px] font-medium text-ink transition-colors hover:text-rose-700">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">{l.label}</span>
                  <span className="font-display absolute inset-x-3.5 top-full block italic transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[calc(100%+0.7rem)]">
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <InstagramLink
              location="nav"
              aria-label={`Instagram @${DOCTOR.instagramHandle}`}
              className="group relative hidden h-11 w-11 place-items-center overflow-hidden rounded-full border border-rose-600/15 bg-white/70 text-rose-700 transition-colors hover:border-transparent hover:text-white sm:grid"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-rose-500 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" />
              <InstagramLogo weight="regular" className="relative h-5 w-5" />
            </InstagramLink>
            <WhatsAppLink
              location="nav"
              className="hidden h-11 items-center gap-2 rounded-full bg-rose-600 px-5 text-sm font-semibold text-white shadow-rose transition-colors hover:bg-rose-700 md:inline-flex"
            >
              <WhatsappLogo weight="fill" className="h-4 w-4" />
              Agendar consulta
            </WhatsAppLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-rose-600/20 bg-white/60 text-rose-700 xl:hidden"
              aria-label="Abrir menu"
              aria-expanded={open}
              aria-controls="menu-mobile"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-rose-100 px-5 pb-8 pt-4"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 44px)" }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
            data-lenis-prevent
          >
            <div className="glow pointer-events-none absolute -right-40 top-1/3 h-[34rem] w-[34rem] [--glow-a:0.9] [--glow:250_247_243]" />
            <div className="relative flex items-center justify-between gap-3">
              <Wordmark compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-rose-600/20 bg-white/60 text-rose-700"
                aria-label="Fechar menu"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="relative mt-10 flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-rose-600/10">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display flex min-h-[64px] items-center text-[2.3rem] leading-tight tracking-tight text-rose-700"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: EASE_SOFT, delay: 0.25 + i * 0.06 }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div className="relative mt-auto grid gap-3 pt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7, ease: EASE_OUT }}>
              <WhatsAppLink location="menu_mobile" className="flex h-14 items-center justify-center gap-2 rounded-full bg-rose-600 font-semibold text-white shadow-rose">
                <WhatsappLogo weight="fill" className="h-5 w-5" /> Agendar pelo WhatsApp
              </WhatsAppLink>
              <InstagramLink location="menu_mobile" className="flex h-12 items-center justify-center gap-2 text-sm font-semibold text-rose-700">
                <InstagramLogo className="h-4 w-4" /> @{DOCTOR.instagramHandle}
              </InstagramLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────── WhatsApp sempre à mão: barra no celular e botão no desktop ───────────── */

export function FloatingContact() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 700));

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="bar"
            className="fixed inset-x-0 bottom-0 z-40 border-t border-rose-600/10 bg-cream-50/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: EASE_SOFT }}
          >
            <WhatsAppLink location="barra_mobile" className="flex h-12 items-center justify-center gap-2 rounded-full bg-rose-600 text-[15px] font-semibold text-white">
              <WhatsappLogo weight="fill" className="h-5 w-5" /> Agendar pelo WhatsApp
            </WhatsAppLink>
          </motion.div>

          <motion.div
            key="fab"
            className="fixed bottom-6 right-6 z-40 hidden md:block"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            <WhatsAppLink
              location="botao_flutuante"
              className="group relative flex h-16 items-center overflow-hidden rounded-full bg-rose-600 pl-5 pr-5 text-white shadow-[0_18px_40px_-12px_rgba(142,90,91,0.6)] transition-[padding] duration-500 hover:pr-6"
              aria-label="Agendar consulta pelo WhatsApp"
            >
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-rose-400" />
              <WhatsappLogo weight="fill" className="relative h-7 w-7" />
              <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width,margin] duration-500 group-hover:ml-2 group-hover:max-w-[180px]">
                Agendar consulta
              </span>
            </WhatsAppLink>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ───────────── Cookies (LGPD) com Consent Mode v2 ───────────── */

const CONSENT_KEY = "bianca-consent";

function applyConsent(granted: boolean) {
  const v = granted ? "granted" : "denied";
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v, personalization_storage: v });
  pushEvent("consent_update", { consent_state: v });
}

export function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen: string | null = null;
    try {
      seen = localStorage.getItem(CONSENT_KEY);
    } catch {
      seen = null;
    }
    if (seen) return;
    const timer = window.setTimeout(() => setOpen(true), 2800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener("bianca:cookies", reopen);
    return () => window.removeEventListener("bianca:cookies", reopen);
  }, []);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
    } catch {
      /* modo privado: só fecha */
    }
    applyConsent(granted);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-[45] rounded-3xl border border-rose-600/10 bg-cream-50/95 p-4 text-[13px] text-ink shadow-float backdrop-blur-xl md:inset-x-auto md:bottom-6 md:left-6 md:max-w-sm md:p-5 md:text-sm"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_SOFT }}
        >
          <p className="leading-relaxed text-ink-soft">
            Este site pode usar cookies para entender as visitas e melhorar a divulgação. Você escolhe. Saiba mais na{" "}
            <a href={assetUrl("politica-de-privacidade.html")} className="font-semibold text-rose-700 underline underline-offset-4">
              Política de Privacidade
            </a>
            .
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => choose(false)} className="h-11 flex-1 rounded-full border border-rose-600/25 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-600/5">
              Recusar
            </button>
            <button type="button" onClick={() => choose(true)} className="h-11 flex-1 rounded-full bg-rose-600 text-sm font-semibold text-white transition-colors hover:bg-rose-700">
              Aceitar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
