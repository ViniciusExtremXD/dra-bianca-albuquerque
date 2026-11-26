import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { FAQ, QUESTION_WA_MESSAGE } from "../data/site";
import { EASE_SOFT, Kicker, Reveal, SplitWords } from "../components/motion";
import { PrimaryCta } from "../components/cta";

/* Sem evento de medição ao abrir uma pergunta: o texto das perguntas fala de DIU, gravidez etc. (dado de saúde). */
export function Faq() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="duvidas" className="relative bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Kicker>dúvidas</Kicker>
            <h2 className="font-display mt-5 text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.04] tracking-tightest text-rose-500">
              <SplitWords text="Perguntas que *sempre* aparecem" />
            </h2>
            <Reveal className="mt-6 max-w-sm">
              <p className="text-lg leading-relaxed text-ink-soft">Não encontrou a sua? Me manda uma mensagem no WhatsApp.</p>
            </Reveal>
            <Reveal className="mt-8" delay={0.1}>
              <PrimaryCta location="duvidas" size="md" message={QUESTION_WA_MESSAGE}>
                Tirar uma dúvida
              </PrimaryCta>
            </Reveal>
          </div>
        </div>

        <ul className="lg:col-span-7">
          {FAQ.map((f, i) => {
            const on = open === i;
            const id = `faq-${i}`;
            return (
              <Reveal as="li" key={f.q} delay={i * 0.04} className="border-b border-rose-600/15">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q`}
                    aria-expanded={on}
                    aria-controls={`${id}-a`}
                    onClick={() => setOpen(on ? -1 : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`font-display text-[1.35rem] leading-snug transition-colors duration-500 sm:text-2xl ${on ? "text-rose-700" : "text-ink group-hover:text-rose-700"}`}>{f.q}</span>
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        on ? "rotate-45 bg-rose-600 text-white" : "bg-rose-100 text-rose-700 group-hover:bg-rose-200"
                      }`}
                    >
                      <Plus weight="bold" className="h-4 w-4" />
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
                      transition={{ duration: 0.6, ease: EASE_SOFT }}
                    >
                      <p className="max-w-2xl pb-7 text-[17px] leading-relaxed text-ink-soft">{f.a}</p>
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
