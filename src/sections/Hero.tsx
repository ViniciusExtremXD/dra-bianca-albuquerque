import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { useElementProgress } from "../lib/scroll-progress";
import { useCalm } from "../lib/motion-pref";
import { DOCTOR, shoot } from "../data/site";
import { EASE_IN_OUT, EASE_SOFT, Heart, SplitWords, VelocityMarquee } from "../components/motion";
import { PrimaryCta, TextLink } from "../components/cta";
import { Seal } from "../components/brand";

const MARQUEE = ["Acompanhamento obstétrico", "Acompanhamento ginecológico", "Laparoscopia", "Inserção de DIU", "Inserção de Implanon", "Saúde da mulher"];
const HERO = shoot("blazer-branco-sorriso");

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const calm = useCalm();
  const p = useElementProgress(ref, ["start start", "end start"]);
  const textY = useTransform(p, [0, 1], ["0%", calm ? "0%" : "14%"]);
  const textOpacity = useTransform(p, [0, 0.85], [1, calm ? 1 : 0.15]);
  const photoY = useTransform(p, [0, 1], ["0%", calm ? "0%" : "-7%"]);
  const sealRotate = useTransform(p, [0, 1], [-8, calm ? -8 : 14]);
  const sealY = useTransform(p, [0, 1], ["0%", calm ? "0%" : "-60%"]);

  return (
    <section id="topo" ref={ref} className="relative isolate overflow-hidden bg-cream pt-[5.75rem] sm:pt-28 lg:pt-32">
      {/* Luz rosada bem suave atrás da foto */}
      <div className="glow absolute -right-40 top-0 -z-10 h-[1100px] w-[1100px] [--glow-a:0.55] [--glow:227_192_186]" />

      <div className="mx-auto grid max-w-[88rem] grid-cols-[minmax(0,1fr)] gap-y-7 px-5 pb-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:px-12 lg:pb-24">
        {/* Nome */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="lg:col-span-6 lg:row-span-2 lg:self-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE_SOFT }}
            className="caps flex items-center gap-2.5 text-rose-500"
          >
            Saúde da Mulher <Heart className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{DOCTOR.name}</span>
          </motion.p>

          <h1 className="font-display mt-5 text-[clamp(3.1rem,8.6vw,8.4rem)] leading-[0.92] tracking-tightest text-rose-500 lg:mt-7">
            <SplitWords text="Dra. Bianca" immediate={ready} delay={0.1} className="block" />
            <SplitWords text="*Albuquerque*" immediate={ready} delay={0.28} className="block" accentClassName="italic text-rose-400" />
          </h1>

          {/* Desktop: texto e CTA ao lado da foto */}
          <HeroCopy ready={ready} className="hidden lg:block" />
        </motion.div>

        {/* Retrato em arco, dominando um lado; o selo de cera assina na borda */}
        <motion.div style={{ y: photoY }} className="relative lg:col-span-6 lg:row-span-2">
          <div className="relative mx-auto w-full max-w-[460px] lg:ml-auto lg:mr-0 lg:max-w-[560px]">
            {/* Arco blush deslocado, para dar profundidade */}
            <motion.div
              aria-hidden
              className="arch absolute inset-0 translate-x-4 translate-y-4 bg-rose-200 sm:translate-x-7 sm:translate-y-6"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : undefined}
              transition={{ duration: 1.4, delay: 0.6 }}
            />
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 28px 28px)" }}
              animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 999px 999px 28px 28px)" } : undefined}
              transition={{ duration: 1.6, ease: EASE_IN_OUT, delay: 0.2 }}
              className="arch relative h-[clamp(300px,47svh,440px)] overflow-hidden bg-cream-300 sm:h-[clamp(420px,58svh,560px)] lg:h-auto lg:aspect-[4/5.4]"
            >
              <motion.img
                src={HERO.src}
                srcSet={HERO.srcSet}
                sizes="(min-width: 1024px) 560px, 92vw"
                width={HERO.width}
                height={HERO.height}
                alt="Dra. Bianca Albuquerque sorrindo, de blazer branco"
                {...{ fetchpriority: "high" }}
                className="h-full w-full object-cover object-[50%_12%]"
                initial={{ scale: 1.16 }}
                animate={ready ? { scale: 1 } : undefined}
                transition={{ duration: 2.6, ease: EASE_SOFT, delay: 0.2 }}
              />
            </motion.div>

            <motion.div
              style={{ rotate: sealRotate, y: sealY }}
              className="absolute -bottom-6 -left-3 w-[104px] sm:-left-10 sm:w-[150px] lg:-bottom-8 lg:-left-16 lg:w-[190px]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.4, filter: "blur(6px)" }}
                animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)" } : undefined}
                transition={{ duration: 1.1, ease: EASE_SOFT, delay: 1.25 }}
              >
                <Seal eager className="w-full drop-shadow-[0_22px_24px_rgba(85,48,47,0.38)]" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Celular e tablet: texto e CTA depois da foto (a foto aparece já na primeira tela) */}
        <HeroCopy ready={ready} className="pt-3 lg:hidden" />
      </div>

      {/* Faixa com os atendimentos, no itálico fino dos posts */}
      <div className="relative border-y border-rose-500/15 py-5 sm:py-6">
        <VelocityMarquee baseVelocity={-0.5}>
          {MARQUEE.map((m) => (
            <span key={m} className="flex items-center">
              <span className="font-display px-7 text-[1.7rem] italic tracking-tight text-rose-400 sm:px-10 sm:text-[2.4rem]">{m}</span>
              <Heart className="h-4 w-4 text-rose-300 sm:h-5 sm:w-5" />
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}

function HeroCopy({ ready, className }: { ready: boolean; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1.1, ease: EASE_SOFT, delay: 0.7 }}
      className={className}
    >
      <p className="font-display text-[1.45rem] leading-snug text-ink sm:text-[1.7rem] lg:mt-9">
        Ginecologista e Obstetra <span className="italic text-rose-500">em Macapá</span>
      </p>
      <p className="mt-4 max-w-[34rem] text-pretty text-[17px] leading-relaxed text-ink-soft lg:text-[19px]">
        Agenda aberta para atendimentos ginecológicos e acompanhamento integral da saúde da mulher.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
        <PrimaryCta location="hero">Agendar consulta</PrimaryCta>
        <TextLink href="#sobre">Conheça a Dra. Bianca</TextLink>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rose-500/15 pt-5">
        <p className="caps text-ink">{DOCTOR.registry}</p>
        <p className="caps text-ink-soft">
          {DOCTOR.clinic} · {DOCTOR.city}
        </p>
      </div>
    </motion.div>
  );
}
