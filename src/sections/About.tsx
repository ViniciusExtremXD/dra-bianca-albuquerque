import { useRef } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { useElementProgress } from "../lib/scroll-progress";
import { useCalm } from "../lib/motion-pref";
import { DOCTOR, MISSION_GOAL, STORY, assetUrl } from "../data/site";
import { ClipReveal, EASE_SOFT, Kicker, ParallaxImage, Reveal, ScrollLitText, SplitWords } from "../components/motion";
import { TextLink } from "../components/cta";

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-cream-50 py-24 sm:py-32">
      <div className="glow pointer-events-none absolute -left-72 top-40 h-[52rem] w-[52rem] [--glow-a:0.55] [--glow:243_228_225]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Mission />
        <Story />
      </div>
    </section>
  );
}

function Mission() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-4">
        <ClipReveal from="arch" className="mx-auto aspect-[4/5] w-full max-w-[300px] lg:max-w-none">
          <ParallaxImage
            src={assetUrl("images/bianca-retrato.webp")}
            alt="Retrato da Dra. Bianca Albuquerque"
            width={780}
            height={560}
            amount={5}
            position="50% 32%"
            className="arch h-full w-full bg-cream-300"
          />
        </ClipReveal>
      </div>

      <div className="lg:col-span-8">
        <Kicker>sobre mim</Kicker>
        <ScrollLitText
          className="font-display mt-6 text-[clamp(1.85rem,3.9vw,3.3rem)] leading-[1.16] tracking-tight text-ink"
          accentClassName="italic text-rose-500"
          text="Sou *apaixonada* pela Medicina, pelo cuidado com as *mulheres* e por estar presente nos momentos mais *importantes* da vida delas."
        />
        <Reveal className="mt-8 max-w-2xl">
          <p className="text-pretty text-lg leading-relaxed text-ink-soft">{MISSION_GOAL}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex items-end gap-4">
          <p className="font-display text-3xl italic text-rose-600">Bianca Albuquerque</p>
          <p className="pb-1.5 text-xs font-semibold tracking-wide text-ink-soft">{DOCTOR.registry}</p>
        </Reveal>
      </div>
    </div>
  );
}

function Story() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useCalm();
  const progress = useElementProgress(listRef, ["start 70%", "end 60%"]);
  const scaleY = useTransform(progress, [0, 1], [reduce ? 1 : 0, 1]);

  return (
    <div className="mt-28 grid gap-14 sm:mt-36 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <Kicker>minha história</Kicker>
          <h3 className="font-display mt-5 text-[clamp(2.3rem,4.6vw,3.9rem)] leading-[1.04] tracking-tightest text-rose-500">
            <SplitWords text="Essa é a Dra. Bianca que você *ainda* *não* *conhece*" />
          </h3>
          <Reveal className="mt-6 max-w-md">
            <p className="text-pretty text-lg leading-relaxed text-ink-soft">
              Antes do consultório, teve mudança de cidade, maternidade durante a faculdade e trabalho pelo interior do Amapá.
            </p>
          </Reveal>
          <div className="relative mt-10 hidden w-[62%] max-w-[300px] lg:block">
            <ClipReveal from="arch" className="aspect-[3/4]">
              <ParallaxImage
                src={assetUrl("images/bianca-sorriso.webp")}
                alt="Dra. Bianca Albuquerque sorrindo, olhando por cima do ombro"
                width={450}
                height={1192}
                amount={6}
                position="50% 12%"
                className="arch h-full w-full bg-cream-300"
              />
            </ClipReveal>
          </div>
        </div>
      </div>

      <ol ref={listRef} className="relative lg:col-span-7 lg:pt-4">
        {/* Linha da história: trilho claro + traço que se desenha com a rolagem */}
        <span aria-hidden className="absolute bottom-6 left-[11px] top-3 w-px bg-rose-200" />
        <motion.span aria-hidden style={{ scaleY }} className="absolute bottom-6 left-[11px] top-3 w-px origin-top bg-rose-500" />

        {STORY.map((s, i) => (
          <StoryItem key={s.when} index={i} {...s} />
        ))}

        <StoryItem index={STORY.length} when="Hoje" title="Consultório e maternidades" text="Atendo no meu consultório, no bairro Central, e nas principais maternidades de Macapá." last />
      </ol>
    </div>
  );
}

function StoryItem({ when, title, text, index, last = false }: { when: string; title: string; text: string; index: number; last?: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -35% 0px" });
  return (
    <li ref={ref} className={`relative pl-12 sm:pl-16 ${last ? "" : "pb-12 sm:pb-14"}`}>
      {/* Ponto que se enche quando a linha chega */}
      <span aria-hidden className="absolute left-0 top-3 grid h-[23px] w-[23px] place-items-center rounded-full border border-rose-300 bg-cream-50">
        <motion.span
          className="h-[11px] w-[11px] rounded-full bg-rose-500"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        />
      </span>
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.1, ease: EASE_SOFT, delay: index === 0 ? 0.1 : 0 }}
      >
        <p className="font-display text-[2rem] italic leading-none text-rose-500 sm:text-[2.4rem]">{when}</p>
        <h4 className="mt-3 text-lg font-semibold text-ink">{title}</h4>
        <p className="mt-2 max-w-lg text-pretty leading-relaxed text-ink-soft">{text}</p>
        {last && <TextLink href="#onde-atendo" className="mt-3">Veja onde atendo</TextLink>}
      </motion.div>
    </li>
  );
}
