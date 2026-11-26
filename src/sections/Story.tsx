import { useRef } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { useElementProgress } from "../lib/scroll-progress";
import { useCalm } from "../lib/motion-pref";
import { STORY, shoot } from "../data/site";
import { ClipReveal, CurveTop, EASE_SOFT, Kicker, ParallaxImage, Reveal, SplitWords } from "../components/motion";
import { TextLink } from "../components/cta";

const PINNED = shoot("blazer-branco-sentada");
const DETAIL = shoot("detalhe-livro-notebook");

/* Linha do tempo do carrossel "Essa é a Dra. Bianca que você ainda não conhece", com a foto presa ao lado (desktop). */
export function Story() {
  const listRef = useRef<HTMLOListElement>(null);
  const calm = useCalm();
  const progress = useElementProgress(listRef, ["start 65%", "end 60%"]);
  const scaleY = useTransform(progress, [0, 1], [calm ? 1 : 0, 1]);

  return (
    <section id="historia" className="relative overflow-x-clip bg-cream pb-24 pt-16 sm:pb-32 sm:pt-20">
      <CurveTop fill="#FCFAF7" />
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <Kicker>Minha história</Kicker>
          <h2 className="font-display mt-6 text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[1] tracking-tightest text-rose-500">
            <SplitWords text="Essa é a Dra. Bianca que você" className="block" />
            <SplitWords text="*ainda não conhece*" delay={0.2} className="block" accentClassName="italic text-rose-400" />
          </h2>
        </div>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <ClipReveal from="arch" className="aspect-[4/5.4] w-full">
                <ParallaxImage
                  {...PINNED}
                  sizes="34vw"
                  alt="Dra. Bianca Albuquerque sentada, de blazer branco, com a mão no rosto e sorrindo"
                  amount={5}
                  position="50% 25%"
                  className="arch h-full w-full bg-cream-300"
                />
              </ClipReveal>
              <p className="caps mt-5 text-ink-soft">Belém · Macapá · 2014 até hoje</p>
            </div>
          </div>

          <ol ref={listRef} className="relative lg:col-span-7">
            {/* Trilho fino + traço que se desenha com a rolagem */}
            <span aria-hidden className="absolute bottom-10 left-[7px] top-4 w-px bg-rose-500/15" />
            <motion.span aria-hidden style={{ scaleY }} className="absolute bottom-10 left-[7px] top-4 w-px origin-top bg-rose-400" />
            {STORY.map((s) => (
              <StoryItem key={s.when} {...s} />
            ))}
            <StoryItem
              when="Hoje"
              title="Consultório e maternidades"
              text="Atendo no meu consultório particular, no Spazio Vita, e nas maternidades Mãe Luzia, Bem Nascer e no Hospital São Camilo."
              last
            />
          </ol>
        </div>

        {/* Pausa editorial: o detalhe do ensaio (notebook e atlas de anatomia) com a frase dela */}
        <div className="mt-28 grid items-center gap-10 sm:mt-36 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ClipReveal from="left" radius={36}>
              <ParallaxImage
                {...DETAIL}
                sizes="(min-width: 1024px) 52vw, 92vw"
                alt="Detalhe do ensaio: mãos digitando num notebook ao lado de um atlas de anatomia"
                amount={6}
                position="50% 50%"
                className="aspect-[3/2] w-full rounded-[2.25rem] bg-cream-300"
              />
            </ClipReveal>
          </div>
          <div className="lg:col-span-5">
            <p className="font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.06] tracking-tight text-rose-500">
              <SplitWords text="Gravidez ou prevenção?" className="block" />
              <SplitWords text="*Te ajudo a decidir.*" delay={0.15} className="block" accentClassName="italic text-rose-400" />
            </p>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-pretty text-[18px] leading-relaxed text-ink-soft">
                Engravidar agora, mais para frente ou não engravidar: a gente conversa sobre os seus planos e escolhe junto o melhor caminho.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryItem({ when, title, text, last = false }: { when: string; title: string; text: string; last?: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -35% 0px" });
  return (
    <li ref={ref} className={`relative grid gap-x-8 pl-10 sm:grid-cols-[11rem_minmax(0,1fr)] sm:pl-14 ${last ? "" : "pb-14 sm:pb-16"}`}>
      {/* Ponto que se enche quando a linha chega */}
      <span aria-hidden className="absolute left-0 top-[0.9rem] grid h-[15px] w-[15px] place-items-center rounded-full border border-rose-400 bg-cream">
        <motion.span
          className="h-[7px] w-[7px] rounded-full bg-rose-500"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 0.8, ease: EASE_SOFT, delay: 0.1 }}
        />
      </span>
      <motion.p
        className={`font-display italic leading-none tracking-tight text-rose-400 ${/^\d+$/.test(when) ? "text-[2.6rem] sm:text-[3.4rem]" : "text-[2.3rem] sm:text-[2.4rem] sm:pt-2"}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.2, ease: EASE_SOFT }}
      >
        {when}
      </motion.p>
      <motion.div
        className="mt-3 border-t border-rose-500/15 pt-4 sm:mt-1 sm:border-t-0 sm:pt-0"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.2, ease: EASE_SOFT, delay: 0.1 }}
      >
        <h3 className="font-display text-[1.6rem] leading-tight text-ink sm:text-[1.9rem]">{title}</h3>
        <p className="mt-3 max-w-[34rem] text-pretty text-[17px] leading-relaxed text-ink-soft lg:text-[18px]">{text}</p>
        {last && <TextLink href="#consultorio" className="mt-3">Conheça o consultório</TextLink>}
      </motion.div>
    </li>
  );
}
