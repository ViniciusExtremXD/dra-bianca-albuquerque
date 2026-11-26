import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { FAQ, QUESTION_WA_MESSAGE, shoot } from "../data/site";
import { ClipReveal, CurveTop, EASE_SOFT, Kicker, ParallaxImage, Reveal, SplitWords } from "../components/motion";
import { PrimaryCta } from "../components/cta";

const PHOTO = shoot("preto-sorriso");

/* Sem evento de medição ao abrir uma pergunta: o texto das perguntas fala de DIU, gravidez etc. (dado de saúde). */
export function Faq() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="duvidas" className="relative overflow-x-clip bg-cream pb-28 pt-16 sm:pb-36 sm:pt-20">
      <CurveTop fill="#FCFAF7" />
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Kicker>Dúvidas</Kicker>
            <h2 className="font-display mt-6 text-[clamp(2.6rem,5.2vw,4.8rem)] leading-[1.02] tracking-tightest text-rose-500">
              <SplitWords text="Perguntas que" className="block" />
              <SplitWords text="*sempre aparecem*" delay={0.15} className="block" accentClassName="italic text-rose-400" />
            </h2>
            <Reveal className="mt-6 max-w-sm">
              <p className="text-[18px] leading-relaxed text-ink-soft">Não encontrou a sua? Me manda uma mensagem no WhatsApp.</p>
            </Reveal>
            <Reveal className="mt-8" delay={0.1}>
              <PrimaryCta location="duvidas" size="md" message={QUESTION_WA_MESSAGE}>
                Tirar uma dúvida
              </PrimaryCta>
            </Reveal>
            <div className="mt-12 hidden w-[62%] max-w-[300px] lg:block">
              <ClipReveal from="arch" className="aspect-[4/5]">
                <ParallaxImage
                  {...PHOTO}
                  sizes="300px"
                  alt="Dra. Bianca Albuquerque de vestido preto, sorrindo"
                  amount={4}
                  position="50% 16%"
                  className="arch h-full w-full bg-cream-300"
                />
              </ClipReveal>
            </div>
          </div>
        </div>

        <ul className="border-t border-rose-500/20 lg:col-span-7">
          {FAQ.map((f, i) => {
            const on = open === i;
            const id = `faq-${i}`;
            return (
              <Reveal as="li" key={f.q} delay={i * 0.04} className="border-b border-rose-500/20">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q`}
                    aria-expanded={on}
                    aria-controls={`${id}-a`}
                    onClick={() => setOpen(on ? -1 : i)}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className={`font-display text-[1.45rem] leading-snug transition-colors duration-500 sm:text-[1.8rem] ${on ? "text-rose-500" : "text-ink group-hover:text-rose-500"}`}>{f.q}</span>
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-[transform,background-color,color,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        on ? "rotate-45 border-rose-500 bg-rose-500 text-cream" : "border-rose-500/30 text-rose-500 group-hover:border-rose-500"
                      }`}
                    >
                      <Plus weight="light" className="h-5 w-5" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`${id}-a`}
                      role="region"
                      aria-labelledby={`${id}-q`}
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE_SOFT }}
                    >
                      <p className="max-w-2xl pb-8 text-pretty text-[17px] leading-relaxed text-ink-soft lg:text-[18px]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
