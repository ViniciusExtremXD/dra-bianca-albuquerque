import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Checks, WhatsappLogo } from "@phosphor-icons/react";
import { DEFAULT_WA_MESSAGE, DOCTOR } from "../data/site";
import { EASE_SOFT, Kicker, Reveal, SplitWords } from "../components/motion";
import { WhatsAppLink } from "../components/cta";
import { Monogram } from "../components/brand";

const STEPS = [
  { title: "Me chame no WhatsApp", text: "Toque no botão e a mensagem já vai pronta. Se preferir, escreva com as suas palavras." },
  { title: "Combinamos o dia e o horário", text: "Pelo próprio WhatsApp, acertamos a data da sua consulta." },
  { title: "Nos vemos no consultório", text: `A consulta é presencial, na ${DOCTOR.address.street}, ${DOCTOR.address.district}, em Macapá.` },
];

export function Steps() {
  return (
    <section id="como-agendar" className="relative overflow-hidden bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Kicker>como agendar</Kicker>
          <h2 className="font-display mt-5 text-[clamp(2.4rem,5vw,4.3rem)] leading-[1.04] tracking-tightest text-rose-500">
            <SplitWords text="Agendar é *simples*" />
          </h2>

          <ol className="mt-10 grid gap-2">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1, ease: EASE_SOFT, delay: i * 0.14 }}
                className="group relative flex gap-5 pb-7 last:pb-0"
              >
                {/* Arquinho que se enche + fio até o próximo passo */}
                <span aria-hidden className="relative flex w-7 shrink-0 flex-col items-center">
                  <span className="arch relative mt-1 block h-9 w-7 overflow-hidden border border-rose-400 bg-cream-50">
                    <motion.span
                      className="absolute inset-0 origin-bottom bg-rose-200"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                      transition={{ duration: 1.2, ease: EASE_SOFT, delay: 0.3 + i * 0.25 }}
                    />
                  </span>
                  {i < STEPS.length - 1 && <span className="mt-2 w-px flex-1 bg-gradient-to-b from-rose-300 to-rose-300/0" />}
                </span>
                <span>
                  <span className="font-display block text-[1.6rem] leading-tight text-ink sm:text-[1.85rem]">{s.title}</span>
                  <span className="mt-2 block max-w-md leading-relaxed text-ink-soft">{s.text}</span>
                </span>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-6">
          <ChatPreview />
        </div>
      </div>
    </section>
  );
}

/* A conversa que a paciente vai abrir: a mensagem pronta e os três pontinhos de "digitando". Nenhuma resposta inventada. */
function ChatPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  return (
    <Reveal className="relative isolate mx-auto max-w-[460px]">
      <div aria-hidden className="arch absolute -inset-x-6 -bottom-6 -top-10 -z-10 bg-rose-100 sm:-inset-x-10" />
      <div ref={ref} className="relative overflow-hidden rounded-[2rem] bg-cream-50 shadow-float ring-1 ring-rose-600/5">
        <div className="flex items-center gap-3 border-b border-rose-600/10 bg-white/70 px-5 py-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-rose-100">
            <Monogram className="h-7 w-auto" strokeWidth={2.4} />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-semibold text-ink">{DOCTOR.name}</span>
            <span className="block text-xs text-ink-soft">WhatsApp · {DOCTOR.whatsappDisplay}</span>
          </span>
        </div>

        <div className="relative min-h-[240px] bg-[radial-gradient(circle_at_1px_1px,rgba(185,133,131,0.18)_1px,transparent_0)] bg-[length:18px_18px] px-4 py-6 sm:px-6">
          <motion.div
            className="ml-auto max-w-[86%] rounded-[1.4rem] rounded-br-md bg-rose-100 px-4 py-3 text-[15px] leading-snug text-ink shadow-soft"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 0.8, ease: EASE_SOFT, delay: 0.2 }}
            style={{ transformOrigin: "100% 100%" }}
          >
            {DEFAULT_WA_MESSAGE}
            <span className="mt-1 flex items-center justify-end gap-1 text-[11px] text-ink-soft">
              agora <Checks weight="bold" className="h-3.5 w-3.5 text-rose-500" />
            </span>
          </motion.div>

          <motion.div
            className="mt-4 inline-flex items-center gap-1.5 rounded-[1.2rem] rounded-bl-md bg-white px-4 py-3.5 shadow-soft"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: EASE_SOFT, delay: 1.1 }}
            aria-hidden
          >
            {[0, 1, 2].map((d) => (
              <span key={d} className="h-2 w-2 animate-typing rounded-full bg-rose-400" style={{ animationDelay: `${d * 0.18}s` }} />
            ))}
          </motion.div>
        </div>

        <div className="border-t border-rose-600/10 bg-white/70 p-4">
          <WhatsAppLink
            location="como_agendar"
            className="flex h-14 items-center justify-center gap-2 rounded-full bg-rose-600 font-semibold text-white shadow-rose transition-colors hover:bg-rose-700"
          >
            <WhatsappLogo weight="fill" className="h-5 w-5" /> Enviar esta mensagem
          </WhatsAppLink>
        </div>
      </div>
    </Reveal>
  );
}
