import { motion } from "framer-motion";
import { CARE, PRENATAL, SURGERY, assetUrl } from "../data/site";
import { ClipReveal, EASE_SOFT, Kicker, ParallaxImage, Petal, Reveal, SplitWords } from "../components/motion";
import { PrimaryCta } from "../components/cta";

/*
 * Três blocos com ritmos diferentes, nada de grade de cartões com ícone:
 *  1. Pré-natal: foto do ultrassom em arco + o título enorme como nos carrosséis ("Pré-*natal*").
 *  2. Prevenção e planejamento: painel blush com três colunas editoriais (ginecologia, DIU, Implanon).
 *  3. Cirurgia: texto + foto do centro cirúrgico.
 * Os botões levam todos a mesma mensagem e o mesmo `location` ("atendimentos"): nenhum nome de procedimento sai na medição.
 */
export function Services() {
  return (
    <section id="atendimentos" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Kicker>atendimentos</Kicker>
            <h2 className="font-display mt-5 text-[clamp(2.4rem,5vw,4.3rem)] leading-[1.04] tracking-tightest text-rose-500">
              <SplitWords text="Como posso *cuidar* de você" />
            </h2>
          </div>
          <Reveal className="lg:col-span-5 lg:pb-3">
            <p className="max-w-md text-pretty text-lg leading-relaxed text-ink-soft">
              Da consulta de rotina ao pré-natal, da escolha do método contraceptivo à cirurgia ginecológica. Cada atendimento começa com uma boa conversa.
            </p>
          </Reveal>
        </div>

        <PreNatal />
        <Planning />
        <Surgery />
      </div>
    </section>
  );
}

function PreNatal() {
  return (
    <div className="mt-16 grid items-center gap-10 sm:mt-24 md:grid-cols-12 md:gap-12">
      <div className="relative isolate md:col-span-5 lg:col-span-4 lg:col-start-2">
        <ClipReveal from="arch" className="relative mx-auto aspect-[5/9] max-w-[290px] md:max-w-[360px]">
          <ParallaxImage
            src={assetUrl("images/bianca-pre-natal.webp")}
            alt="Dra. Bianca Albuquerque sorrindo enquanto faz o ultrassom na barriga de uma gestante"
            width={348}
            height={991}
            amount={3}
            position="50% 0%"
            className="arch h-full w-full bg-rose-100"
          />
        </ClipReveal>
        {/* Arco de contorno, deslocado */}
        <div aria-hidden className="arch pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-full max-w-[290px] -translate-x-[calc(50%-18px)] translate-y-[18px] border border-rose-300 md:max-w-[360px]" />
      </div>

      <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
        <h3 className="font-display text-[clamp(3.6rem,10vw,7.5rem)] leading-[0.95] tracking-tightest text-rose-500">
          <SplitWords text="Pré-*natal*" stagger={0} />
        </h3>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg text-pretty text-xl leading-relaxed text-ink sm:text-2xl sm:leading-snug">{PRENATAL.text}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
            Cada consulta é um espaço para tirar dúvidas, acompanhar o desenvolvimento do bebê e cuidar de você também.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-9">
          <PrimaryCta location="atendimentos" size="md">
            Agendar consulta
          </PrimaryCta>
        </Reveal>
      </div>
    </div>
  );
}

function Planning() {
  return (
    <Reveal className="relative mt-24 overflow-hidden rounded-[2.5rem] bg-rose-100 sm:mt-32 sm:rounded-[3rem]">
      <span id="prevencao" className="absolute top-0" aria-hidden />
      {/* Arcos grandes e claros ao fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="arch absolute -right-24 top-16 h-[130%] w-[26rem] border border-white/70" />
        <div className="arch absolute -right-10 top-28 h-[130%] w-[22rem] border border-white/60" />
        <div className="glow absolute -left-40 -top-40 h-[36rem] w-[36rem] [--glow-a:0.7] [--glow:250_247_243]" />
      </div>

      <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        <div className="max-w-2xl">
          <h3 className="font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.04] tracking-tightest text-rose-600">
            <SplitWords text="Prevenção e *planejamento*" />
          </h3>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
            Engravidar agora, mais para frente ou não engravidar? A gente conversa sobre os seus planos e escolhe junto o melhor caminho.
          </p>
        </div>

        <ul className="mt-12 grid lg:mt-14 lg:grid-cols-3">
          {CARE.map((c, i) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 1.1, ease: EASE_SOFT, delay: i * 0.12 }}
              className="group relative border-t border-rose-600/15 py-8 lg:border-l lg:border-t-0 lg:px-9 lg:py-2 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              {/* Arco que sobe por trás da coluna no hover */}
              <span
                aria-hidden
                className="arch pointer-events-none absolute inset-x-2 -bottom-4 top-0 hidden origin-bottom scale-y-0 bg-cream-50/60 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 lg:block lg:inset-x-3"
              />
              <div className="relative">
                <h4 className="font-display text-[2rem] leading-tight tracking-tight text-ink sm:text-[2.3rem]">{c.name}</h4>
                <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">{c.text}</p>
                <p className="mt-5 flex max-w-sm items-start gap-2.5 text-[15px] font-medium leading-snug text-rose-700">
                  <Petal className="mt-[3px] h-4 w-4 shrink-0 text-rose-400 transition-transform duration-700 group-hover:rotate-90" />
                  {c.note}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-5 border-t border-rose-600/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display max-w-md text-2xl leading-snug text-rose-700">
            Gravidez ou prevenção? <span className="italic">Te ajudo a decidir.</span>
          </p>
          <PrimaryCta location="atendimentos" size="md">
            Agendar consulta
          </PrimaryCta>
        </div>
      </div>
    </Reveal>
  );
}

function Surgery() {
  return (
    <div className="mt-24 grid items-center gap-10 sm:mt-32 lg:grid-cols-12 lg:gap-14">
      <div className="order-2 lg:order-1 lg:col-span-5">
        <h3 className="font-display text-[clamp(2.2rem,4.4vw,3.7rem)] leading-[1.04] tracking-tightest text-rose-500">
          <SplitWords text="Cirurgia ginecológica e *laparoscopia*" />
        </h3>
        <ul className="mt-9 grid gap-8">
          {SURGERY.map((s, i) => (
            <Reveal as="li" key={s.name} delay={0.1 + i * 0.1} className="border-l border-rose-400 pl-6">
              <p className="font-display text-2xl text-ink">{s.name}</p>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.text}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.3}>
          <p className="mt-8 text-[15px] leading-relaxed text-ink-soft">A indicação de cada cirurgia é sempre avaliada na consulta, junto com você.</p>
        </Reveal>
        <Reveal delay={0.35} className="mt-8">
          <PrimaryCta location="atendimentos" size="md">
            Agendar avaliação
          </PrimaryCta>
        </Reveal>
      </div>

      <div className="order-1 lg:order-2 lg:col-span-7">
        <ClipReveal from="right" radius={40} className="relative">
          <ParallaxImage
            src={assetUrl("images/bianca-cirurgia.webp")}
            alt="Dra. Bianca Albuquerque no centro cirúrgico, de touca e máscara"
            width={960}
            height={635}
            amount={6}
            position="50% 30%"
            className="aspect-[4/3] rounded-[2.5rem] bg-cream-300 sm:aspect-[3/2]"
          />
        </ClipReveal>
      </div>
    </div>
  );
}
