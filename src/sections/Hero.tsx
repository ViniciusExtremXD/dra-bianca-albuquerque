import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useElementProgress } from "../lib/scroll-progress";
import { useCalm } from "../lib/motion-pref";
import { DOCTOR, assetUrl } from "../data/site";
import { EASE_IN_OUT, EASE_SOFT, Petal, SplitWords, VelocityMarquee } from "../components/motion";
import { PrimaryCta, TextLink } from "../components/cta";
import { Monogram } from "../components/brand";

const MARQUEE = ["Pré-natal", "Ginecologia", "Prevenção", "DIU", "Implanon", "Cirurgia ginecológica", "Laparoscopia"];

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const scrollYProgress = useElementProgress(ref, ["start start", "end start"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-10%"]);

  /* Brilho rosado que segue o ponteiro, bem devagar (só desktop) */
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const sx = useSpring(mx, { stiffness: 40, damping: 22 });
  const sy = useSpring(my, { stiffness: 40, damping: 22 });

  return (
    <section
      id="topo"
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cream-100 pt-[6.5rem] sm:pt-32"
    >
      {/* Atmosfera: luz quente e rosada, sem nada de "gradiente de tecnologia" */}
      <div className="glow absolute -right-60 -top-52 -z-10 h-[980px] w-[980px] [--glow-a:0.8] [--glow:243_228_225]" />
      <div className="glow absolute -bottom-40 -left-64 -z-10 h-[720px] w-[720px] [--glow-a:0.7] [--glow:244_238_231]" />
      <motion.div
        aria-hidden
        className="glow pointer-events-none absolute left-0 top-0 -z-10 hidden h-[620px] w-[620px] [--glow-a:0.5] [--glow:234_210_205] md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", willChange: "transform" }}
      />

      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 pb-14 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-20">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative lg:col-span-7">
          <h1>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, ease: EASE_SOFT }}
              className="mb-7 flex items-center gap-3.5"
            >
              {/* Rostinho em arco no celular: a médica aparece antes da dobra */}
              <span className="arch relative block h-[58px] w-[46px] shrink-0 overflow-hidden bg-rose-100 ring-1 ring-rose-300/60 lg:hidden">
                <img src={assetUrl("images/bianca-retrato.webp")} alt="" width={780} height={560} className="h-full w-full object-cover object-[50%_30%]" />
              </span>
              <span className="block text-[13px] font-semibold leading-snug text-rose-700 min-[360px]:text-sm">
                <span className="block">{DOCTOR.name}</span>
                <span className="block font-medium text-ink-soft">Ginecologista e obstetra em Macapá</span>
              </span>
            </motion.span>
            <span className="font-display block text-[clamp(2.7rem,6.6vw,5.4rem)] leading-[1.02] tracking-tightest text-rose-500">
              <SplitWords text="Gravidez ou" immediate={ready} delay={0.1} className="block" />
              <SplitWords text="*prevenção?*" immediate={ready} delay={0.24} className="block" />
              <SplitWords text="Te ajudo a *decidir.*" immediate={ready} delay={0.38} className="block" />
            </span>
          </h1>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1, ease: EASE_SOFT, delay: 0.75 }}>
            <p className="mt-7 max-w-xl text-pretty text-[17px] leading-relaxed text-ink-soft sm:text-xl sm:leading-relaxed">
              Acompanho o seu <strong className="font-semibold text-ink">pré-natal</strong>, cuido da sua <strong className="font-semibold text-ink">saúde íntima</strong> e te ajudo a escolher o
              método que combina com a sua vida, com um atendimento <em className="font-display text-[1.08em] text-rose-700">humano e acolhedor</em>.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <PrimaryCta location="hero">
                <span className="min-[360px]:hidden">Agendar consulta</span>
                <span className="hidden min-[360px]:inline">Agendar pelo WhatsApp</span>
              </PrimaryCta>
              <TextLink href="#sobre">Conheça minha história</TextLink>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-rose-600/10 pt-6 text-sm">
              <div className="flex items-center gap-2">
                <dt className="sr-only">Registro profissional</dt>
                <Petal className="h-3.5 w-3.5 text-rose-400" />
                <dd className="font-semibold tracking-wide text-ink">{DOCTOR.registry}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Atendimento</dt>
                <Petal className="h-3.5 w-3.5 text-rose-400" />
                <dd className="text-ink-soft">Presencial em Macapá</dd>
              </div>
            </dl>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: visualY }} className="relative lg:col-span-5">
          <HeroVisual ready={ready} />
        </motion.div>
      </div>

      {/* Faixa com os atendimentos, no itálico fino dos carrosséis */}
      <div className="relative border-y border-rose-600/10 bg-rose-100/80 py-4 sm:py-5">
        <VelocityMarquee baseVelocity={-0.6}>
          {MARQUEE.map((m) => (
            <span key={m} className="flex items-center">
              <span className="font-display px-6 text-[1.9rem] italic tracking-tight text-rose-500 sm:px-8 sm:text-[2.6rem]">{m}</span>
              <Petal className="h-4 w-4 text-rose-400 sm:h-5 sm:w-5" />
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}

/* Arco concêntrico que se desenha atrás da foto (o mesmo arco do monograma) */
function ArchLine({ inset, delay, ready }: { inset: number; delay: number; ready: boolean }) {
  const w = 400 - inset * 2;
  const d = `M${inset} 520 V${inset + w / 2} A${w / 2} ${w / 2} 0 0 1 ${400 - inset} ${inset + w / 2} V520`;
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#D9B3AF"
      strokeWidth={1}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={ready ? { pathLength: 1, opacity: 1 } : undefined}
      transition={{ pathLength: { duration: 2, ease: EASE_IN_OUT, delay }, opacity: { duration: 0.3, delay } }}
    />
  );
}

function HeroVisual({ ready }: { ready: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[400px] lg:ml-auto lg:mr-4 lg:max-w-[430px]">
      {/* Arcos finos ao fundo */}
      <svg viewBox="-40 -40 480 580" className="pointer-events-none absolute -inset-x-[10%] -top-[8%] -z-10 h-[116%] w-[120%]" aria-hidden preserveAspectRatio="none">
        <ArchLine inset={-30} delay={0.2} ready={ready} />
        <ArchLine inset={-12} delay={0.45} ready={ready} />
      </svg>

      {/* Foto principal em arco */}
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 32px 32px)" }}
        animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 999px 999px 32px 32px)" } : undefined}
        transition={{ duration: 1.5, ease: EASE_IN_OUT, delay: 0.25 }}
        className="arch relative aspect-[4/5] overflow-hidden bg-rose-100 shadow-float"
      >
        <motion.img
          src={assetUrl("images/bianca-blazer.webp")}
          alt="Dra. Bianca Albuquerque sorrindo, de blazer branco"
          width={466}
          height={1172}
          {...{ fetchpriority: "high" }}
          className="h-full w-full object-cover object-[50%_6%]"
          initial={{ scale: 1.18 }}
          animate={ready ? { scale: 1 } : undefined}
          transition={{ duration: 2.4, ease: EASE_SOFT, delay: 0.25 }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-rose-800/25 to-transparent" />
      </motion.div>

      {/* Selo girando: monograma no centro */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
        animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ type: "spring", stiffness: 120, damping: 16, delay: 1.2 }}
        className="absolute -bottom-8 -left-3 h-[118px] w-[118px] sm:-left-10 sm:h-[138px] sm:w-[138px]"
      >
        <div className="relative grid h-full w-full place-items-center rounded-full bg-cream-50 shadow-lift">
          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
            <defs>
              <path id="selo" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
            </defs>
            <text fill="#8E5A5B" fontSize="8.4" fontWeight="600">
              <textPath href="#selo" textLength="272" lengthAdjust="spacing">
                GINECOLOGIA · OBSTETRÍCIA · MACAPÁ ·
              </textPath>
            </text>
          </svg>
          <Monogram className="h-11 w-auto sm:h-12" strokeWidth={2} />
        </div>
      </motion.div>

      {/* Bilhete com a bio do Instagram */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={ready ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 1.1, ease: EASE_SOFT, delay: 1.45 }}
        className="absolute right-0 top-[58%] max-w-[205px] sm:-right-6 lg:-right-10"
      >
        <div className="animate-drift rounded-[1.5rem] rounded-bl-md bg-cream-50/95 px-5 py-4 shadow-lift backdrop-blur">
          <p className="font-display text-[1.15rem] leading-snug text-rose-700">
            Laparoscopia, DIU, Implanon e <span className="whitespace-nowrap italic">pré-natal</span>
          </p>
          <p className="mt-1.5 text-xs font-medium text-ink-soft">Presencial em Macapá</p>
        </div>
      </motion.div>
    </div>
  );
}
