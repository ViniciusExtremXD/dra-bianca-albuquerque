import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { bindAnchorLinks, initSmoothScroll } from "./lib/smooth-scroll";
import { pauseOffscreenAnimations } from "./lib/visibility";
import { pushEvent } from "./data/site";
import { RESPECT_REDUCED_MOTION } from "./lib/motion-pref";
import { CookieNotice, FloatingContact, Nav, Preloader, ScrollProgress } from "./components/chrome";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { About } from "./sections/About";
import { Places } from "./sections/Places";
import { Steps } from "./sections/Steps";
import { Faq } from "./sections/Faq";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

export default function App() {
  const [ready, setReady] = useState(false);
  const onIntroDone = useCallback(() => setReady(true), []);

  useEffect(() => {
    const stopScroll = initSmoothScroll();
    const unbind = bindAnchorLinks();
    const stopPause = pauseOffscreenAnimations();
    if (!RESPECT_REDUCED_MOTION) document.documentElement.classList.add("motion-full");

    // Quais partes da página o visitante chega a ver (uma vez por seção). Só o id da seção, nada de saúde.
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!entry.isIntersecting || seen.has(id)) continue;
          seen.add(id);
          pushEvent("section_view", { section_id: id });
        }
      },
      { threshold: 0.35 },
    );
    document.querySelectorAll("main section[id]").forEach((el) => io.observe(el));

    return () => {
      stopScroll();
      unbind();
      stopPause();
      io.disconnect();
    };
  }, []);

  return (
    // Ver lib/motion-pref.ts: "user" = quem pediu menos movimento no sistema vê a versão calma.
    <MotionConfig reducedMotion={RESPECT_REDUCED_MOTION ? "user" : "never"}>
      <a href="#atendimentos" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[90] focus:rounded-full focus:bg-rose-600 focus:px-5 focus:py-3 focus:text-white">
        Pular para o conteúdo
      </a>
      <Preloader onDone={onIntroDone} />
      <ScrollProgress />
      <Nav />
      <main className="paper">
        <Hero ready={ready} />
        <Services />
        <About />
        <Places />
        <Steps />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
      <CookieNotice />
    </MotionConfig>
  );
}
