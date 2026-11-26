import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { InstagramLogo, List, WhatsappLogo, X } from "@phosphor-icons/react";
import { DOCTOR, NAV_LINKS, assetUrl, pushEvent } from "../data/site";
import { lockScroll } from "../lib/smooth-scroll";
import { EASE_IN_OUT, EASE_SOFT } from "./motion";
import { InstagramLink, WhatsAppLink } from "./cta";
import { Seal, Wordmark } from "./brand";

/* ───────────── Abertura: o selo de cera "carimba" (cai, assenta, a sombra aparece) e a cortina sobe em arco ───────────── */

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
    }, quick ? 350 : 2000);
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
          className="bianca-preloader fixed inset-0 z-[100] grid place-items-center bg-cream"
          initial={{ clipPath: "ellipse(160% 160% at 50% 0%)" }}
          exit={{ clipPath: "ellipse(160% 0% at 50% 0%)" }}
          transition={{ duration: 1.15, ease: EASE_IN_OUT }}
        >
          <div className="glow absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 [--glow-a:0.9] [--glow:227_192_186]" />
          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ scale: 1.35, opacity: 0, rotate: -14, filter: "blur(6px)" }}
              animate={{ scale: 1, opacity: 1, rotate: -6, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: EASE_SOFT }}
            >
              <Seal className="h-32 w-auto drop-shadow-[0_18px_22px_rgba(85,48,47,0.35)] sm:h-36" alt={DOCTOR.name} eager />
            </motion.div>
            <motion.p
              className="font-display mt-7 text-[1.9rem] text-rose-500 sm:text-[2.3rem]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.7, ease: EASE_SOFT }}
            >
              Dra. Bianca <span className="italic">Albuquerque</span>
            </motion.p>
            <motion.p
              className="caps mt-3 text-rose-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.0 }}
            >
              Saúde da Mulher
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
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-rose-200 via-rose-400 to-rose-500" />;
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
    setHidden(y > prev && y > 560 && !open);
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
        transition={{ duration: 0.7, ease: EASE_SOFT }}
      >
        <nav
          className={`mx-auto flex h-[68px] max-w-[88rem] items-center justify-between gap-2 rounded-full border px-2 pl-3 transition-[background-color,box-shadow,border-color] duration-700 sm:h-[74px] sm:px-3 sm:pl-4 ${
            solid ? "border-rose-500/10 bg-cream/90 shadow-soft backdrop-blur-md" : "border-transparent bg-cream/0"
          }`}
          aria-label="Principal"
        >
          <a href="#topo" className="flex min-h-[44px] min-w-0 items-center rounded-full" aria-label={`${DOCTOR.name}, ${DOCTOR.title}, ${DOCTOR.registry}: início`}>
            <Wordmark />
          </a>

          <ul className="hidden items-center xl:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative flex h-11 items-center whitespace-nowrap px-3.5 text-[14.5px] font-medium text-ink transition-colors duration-500 hover:text-rose-500">
                  {l.label}
                  <span className="absolute inset-x-3.5 bottom-2 h-px origin-left scale-x-0 bg-rose-400 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <InstagramLink
              location="nav"
              aria-label={`Instagram @${DOCTOR.instagramHandle}`}
              className="hidden h-11 w-11 place-items-center rounded-full border border-rose-500/20 text-rose-500 transition-colors duration-500 hover:bg-rose-500 hover:text-cream sm:grid"
            >
              <InstagramLogo weight="regular" className="h-5 w-5" />
            </InstagramLink>
            <WhatsAppLink
              location="nav"
              className="hidden h-11 items-center gap-2 rounded-full bg-rose-500 px-5 text-[14px] font-semibold text-cream transition-colors duration-500 hover:bg-rose-600 md:inline-flex"
            >
              Agendar consulta
            </WhatsAppLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-rose-500/20 bg-cream/70 text-rose-500 xl:hidden"
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
            className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-rose-500 px-5 pb-8 pt-4 text-cream"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 44px)" }}
            transition={{ duration: 0.85, ease: EASE_IN_OUT }}
            data-lenis-prevent
          >
            <div className="relative flex items-center justify-between gap-3">
              <Wordmark compact tone="dark" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/30 text-cream"
                aria-label="Fechar menu"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="relative mt-10 flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-cream/15">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display flex min-h-[60px] items-center text-[2.1rem] leading-tight tracking-tight"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: EASE_SOFT, delay: 0.25 + i * 0.06 }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div className="relative mt-auto grid gap-3 pt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7, ease: EASE_SOFT }}>
              <WhatsAppLink location="menu_mobile" className="flex h-14 items-center justify-center gap-2 rounded-full bg-cream font-semibold text-rose-600">
                <WhatsappLogo weight="fill" className="h-5 w-5" /> Agendar consulta
              </WhatsAppLink>
              <InstagramLink location="menu_mobile" className="flex h-12 items-center justify-center gap-2 text-sm font-semibold text-cream">
                <InstagramLogo className="h-4 w-4" /> @{DOCTOR.instagramHandle}
              </InstagramLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────── WhatsApp à mão, discreto: barra fina no celular e botão redondo no desktop ───────────── */

export function FloatingContact() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 760));

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="bar"
            className="wa-bar fixed inset-x-0 bottom-0 z-40 border-t border-rose-500/10 bg-cream/90 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl transition-[bottom] duration-500 md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: EASE_SOFT }}
          >
            <WhatsAppLink location="barra_mobile" className="flex h-12 items-center justify-center gap-2 rounded-full bg-rose-500 text-[15px] font-semibold text-cream">
              <WhatsappLogo weight="fill" className="h-5 w-5" /> Agendar consulta
            </WhatsAppLink>
          </motion.div>

          <motion.div
            key="fab"
            className="fixed bottom-6 right-6 z-40 hidden md:block"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_SOFT }}
          >
            <WhatsAppLink
              location="botao_flutuante"
              className="group relative flex h-14 items-center overflow-hidden rounded-full bg-rose-500 pl-[17px] pr-[17px] text-cream shadow-plum ring-1 ring-cream/30 transition-[padding,background-color] duration-500 hover:bg-rose-600 hover:pr-6"
              aria-label="Agendar consulta pelo WhatsApp"
            >
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-rose-300" />
              <WhatsappLogo weight="fill" className="relative h-[22px] w-[22px]" />
              <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-semibold transition-[max-width,margin] duration-500 group-hover:ml-2 group-hover:max-w-[180px]">
                Agendar consulta
              </span>
            </WhatsAppLink>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ───────────── Cookies (LGPD) com Consent Mode v2: barra compacta, sem cobrir o conteúdo ───────────── */

const CONSENT_KEY = "bianca-consent";

function applyConsent(granted: boolean) {
  const v = granted ? "granted" : "denied";
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v, personalization_storage: v });
  pushEvent("consent_update", { consent_state: v });
}

export function CookieNotice() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen: string | null = null;
    try {
      seen = localStorage.getItem(CONSENT_KEY);
    } catch {
      seen = null;
    }
    if (seen) return;
    const timer = window.setTimeout(() => setOpen(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener("bianca:cookies", reopen);
    return () => window.removeEventListener("bianca:cookies", reopen);
  }, []);

  // No celular, a barra do WhatsApp sobe enquanto o aviso estiver aberto (ver styles.css, .wa-bar).
  useEffect(() => {
    const root = document.documentElement;
    if (!open) {
      delete root.dataset.cookie;
      return;
    }
    root.dataset.cookie = "open";
    const update = () => root.style.setProperty("--cookie-h", `${(ref.current?.offsetHeight ?? 0) + 8}px`);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [open]);

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
          ref={ref}
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-[45] flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[1.4rem] border border-rose-500/15 bg-cream/95 px-4 py-2.5 text-[13px] text-ink shadow-card backdrop-blur-xl md:inset-x-0 md:bottom-5 md:mx-auto md:w-max md:max-w-[calc(100vw-12rem)] md:flex-nowrap md:rounded-full md:py-1.5 md:pl-6 md:pr-1.5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_SOFT }}
        >
          <p className="min-w-0 flex-1 leading-snug text-ink-soft md:flex-none">
            Cookies só com a sua permissão.{" "}
            <a href={assetUrl("politica-de-privacidade.html")} className="inline-flex min-h-[44px] items-center font-semibold text-rose-500 underline underline-offset-4 md:min-h-0">
              Saiba mais
            </a>
          </p>
          <div className="flex gap-1.5">
            <button type="button" onClick={() => choose(false)} className="h-11 rounded-full px-4 text-[13px] font-semibold text-rose-500 transition-colors hover:bg-rose-500/10">
              Recusar
            </button>
            <button type="button" onClick={() => choose(true)} className="h-11 rounded-full bg-rose-500 px-5 text-[13px] font-semibold text-cream transition-colors hover:bg-rose-600">
              Aceitar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
