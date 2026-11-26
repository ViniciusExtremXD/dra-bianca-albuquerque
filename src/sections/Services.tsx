import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { SERVICES, assetUrl, shoot, type ServiceMedia } from "../data/site";
import { ClipReveal, CurveTop, EASE_SOFT, Kicker, ParallaxImage, Reveal, SplitWords } from "../components/motion";
import { PrimaryCta } from "../components/cta";

const PHOTO = shoot("anotando-tablet");

/*
 * "Como posso te ajudar na sua jornada" (rascunho do Canva): bloco rosa #B37D7B, títulos creme grandes,
 * lista que abre. Regra de contraste: creme sobre #B37D7B só em texto GRANDE; texto pequeno vai em ink-deep
 * (4,7:1) ou dentro do painel ameixa (5,5:1).
 * Botões: mesma mensagem e mesmo `location` ("atendimentos"); nenhum nome de procedimento sai na medição.
 */
export function Services() {
  const [open, setOpen] = useState(0);
  return (
    <section id="atendimentos" className="relative overflow-x-clip bg-rose-400 pb-28 pt-16 text-cream sm:pb-36 sm:pt-20">
      <CurveTop fill="#B37D7B" />

      <div className="relative mx-auto grid max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <ClipReveal from="arch" className="mx-auto aspect-[4/5] w-full max-w-[420px] lg:aspect-[4/5.3] lg:max-w-none">
              <ParallaxImage
                {...PHOTO}
                sizes="(min-width: 1024px) 34vw, 90vw"
                alt="Dra. Bianca Albuquerque sorrindo enquanto anota num tablet"
                amount={5}
                position="50% 20%"
                className="arch h-full w-full bg-cream-300"
              />
            </ClipReveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <Kicker tone="ink">Atendimentos</Kicker>
          <h2 className="font-display mt-6 text-[clamp(2.7rem,5.6vw,5.2rem)] leading-[1] tracking-tightest text-cream">
            <SplitWords text="Como posso" className="block" />
            <SplitWords text="*te ajudar* na sua" delay={0.12} className="block" accentClassName="italic" />
            <SplitWords text="jornada" delay={0.24} className="block" />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[34rem] text-pretty text-[18px] leading-relaxed text-ink-deep lg:text-[19px]">
              Do pré-natal à prevenção, da escolha do método contraceptivo à cirurgia. Toque em cada atendimento para saber mais.
            </p>
          </Reveal>

          <ul className="mt-12 border-t border-cream/40">
            {SERVICES.map((s, i) => {
              const on = open === i;
              const id = `servico-${s.id}`;
              return (
                <Reveal as="li" key={s.id} delay={i * 0.05} className="border-b border-cream/40">
                  <h3>
                    <button
                      type="button"
                      id={`${id}-t`}
                      aria-expanded={on}
                      aria-controls={`${id}-p`}
                      onClick={() => setOpen(on ? -1 : i)}
                      className="group flex w-full items-center gap-5 py-6 text-left sm:py-7"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="font-display block text-[1.75rem] leading-tight text-cream transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 sm:text-[2.35rem]">
                          {s.name}
                        </span>
                        <span className="caps mt-2 block text-ink-deep">{s.short}</span>
                      </span>
                      <span
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-[transform,background-color,color,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          on ? "rotate-45 border-cream bg-cream text-rose-500" : "border-cream/60 text-cream group-hover:bg-cream/15"
                        }`}
                      >
                        <Plus weight="light" className="h-5 w-5" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`${id}-p`}
                        role="region"
                        aria-labelledby={`${id}-t`}
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.7, ease: EASE_SOFT }}
                      >
                        <div className={`mb-7 grid gap-6 rounded-[1.75rem] bg-rose-500 p-6 sm:p-8 ${s.media ? "sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center" : ""}`}>
                          <div>
                            {s.text.map((t) => (
                              <p key={t} className="text-pretty text-[17px] leading-relaxed text-cream lg:text-[18px] [&+p]:mt-3">
                                {t}
                              </p>
                            ))}
                            {s.note && <p className="font-display mt-5 text-[1.3rem] italic leading-snug text-cream">{s.note}</p>}
                          </div>
                          {s.media && <ServicePhoto kind={s.media} />}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <PrimaryCta location="atendimentos" tone="cream">
              Agendar consulta
            </PrimaryCta>
            <p className="font-display text-[1.65rem] italic leading-snug text-cream">Gravidez ou prevenção? Te ajudo a decidir.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Fotos de trabalho pequenas, no tamanho em que vieram (o ultrassom tem só 348 px: nunca ampliar). */
function ServicePhoto({ kind }: { kind: ServiceMedia }) {
  if (kind === "ultrassom") {
    return (
      <img
        src={assetUrl("images/bianca-pre-natal.webp")}
        alt="Dra. Bianca Albuquerque fazendo ultrassom na barriga de uma gestante"
        width={348}
        height={991}
        loading="lazy"
        decoding="async"
        /* Foto muito alta (348x991): moldura mais alta, ancorada no topo, para caber o rosto inteiro e o transdutor na barriga.
           Sem arco no topo: o arco cortava a cabeça, que fica colada na borda direita da foto. */
        className="aspect-[9/20] w-[170px] rounded-[1.5rem] object-cover object-[50%_0%] sm:w-[200px]"
      />
    );
  }
  return (
    <img
      src={assetUrl("images/bianca-cirurgia.webp")}
      alt="Dra. Bianca Albuquerque no centro cirúrgico, de touca e máscara"
      width={960}
      height={635}
      loading="lazy"
      decoding="async"
      className="aspect-[4/3] w-full max-w-[300px] rounded-[1.25rem] object-cover object-[50%_30%]"
    />
  );
}
