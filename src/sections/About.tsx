import { ABOUT, DOCTOR, MISSION, PASSION, shoot } from "../data/site";
import { ClipReveal, CurveTop, Kicker, ParallaxImage, Reveal, ScrollLitText, SplitWords } from "../components/motion";
import { TextLink } from "../components/cta";
import { Seal } from "../components/brand";

const ABOUT_PHOTO = shoot("maos-no-rosto-sorriso");
const MISSION_PHOTO = shoot("retrato-fundo-escuro");

/* Sobre mim: painel blush com a foto saindo pela borda (como no rascunho do Canva, "Sobre mim" num bloco rosa). */
export function About() {
  return (
    <section id="sobre" className="relative overflow-x-clip bg-cream pb-28 pt-20 sm:pb-40 sm:pt-28">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-0">
          {/* Painel blush, atrás de tudo no desktop */}
          <div aria-hidden className="absolute inset-y-[-3rem] left-[22%] right-0 hidden rounded-[3rem] bg-rose-200 lg:block" />

          <div className="relative lg:col-span-5">
            <ClipReveal from="arch" className="mx-auto aspect-[4/5] w-full max-w-[420px] lg:max-w-none">
              <ParallaxImage
                {...ABOUT_PHOTO}
                sizes="(min-width: 1024px) 34vw, 90vw"
                alt="Dra. Bianca Albuquerque sorrindo, com as mãos sob o queixo"
                amount={5}
                position="50% 22%"
                className="arch h-full w-full bg-cream-300 shadow-card"
              />
            </ClipReveal>
          </div>

          <div className="relative rounded-[2.25rem] bg-rose-200 px-6 py-10 sm:px-12 sm:py-14 lg:col-span-7 lg:bg-transparent lg:py-6 lg:pl-20 lg:pr-16">
            <Kicker tone="deep">Sobre mim</Kicker>
            <h2 className="font-display mt-6 text-[clamp(2.6rem,5.4vw,5rem)] leading-[1] tracking-tightest text-rose-500">
              <SplitWords text="Prazer, sou a" className="block" />
              <SplitWords text="*Dra. Bianca*" delay={0.15} className="block" accentClassName="italic text-rose-600" />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[38rem] text-pretty text-[18px] leading-relaxed text-ink lg:text-[19px]">{ABOUT}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <blockquote className="mt-9 max-w-[36rem] border-l border-rose-500/40 pl-6">
                <p className="font-display text-[1.45rem] italic leading-snug text-rose-600 sm:text-[1.7rem]">“{PASSION}”</p>
              </blockquote>
            </Reveal>
            <Reveal delay={0.3} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-2">
              <TextLink href="#historia" tone="deep">Conheça minha história</TextLink>
              <p className="caps text-rose-600">{DOCTOR.registry}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Minha missão: faixa ameixa, com o retrato de fundo escuro que se funde ao bloco. */
export function Mission() {
  return (
    <section id="missao" className="relative overflow-x-clip bg-rose-500 pb-24 pt-16 text-cream sm:pb-32 sm:pt-20">
      <CurveTop fill="#8E5755" />
      <div className="glow pointer-events-none absolute -right-40 top-10 h-[46rem] w-[46rem] [--glow-a:0.35] [--glow:215_162_160]" />

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="relative lg:col-span-5">
          <ClipReveal from="bottom" radius={36} className="mx-auto aspect-[4/5] w-full max-w-[420px] lg:max-w-none">
            <ParallaxImage
              {...MISSION_PHOTO}
              sizes="(min-width: 1024px) 34vw, 90vw"
              alt="Retrato da Dra. Bianca Albuquerque, de blusa branca, em fundo escuro"
              amount={5}
              position="50% 18%"
              className="h-full w-full rounded-[2.25rem] bg-ink"
            />
          </ClipReveal>
          <Seal className="absolute -top-8 right-2 w-[92px] rotate-[8deg] sm:-right-4 drop-shadow-[0_16px_18px_rgba(0,0,0,0.35)] sm:-right-8 sm:w-[120px]" />
        </div>

        <div className="lg:col-span-7">
          <Kicker tone="cream">Minha missão</Kicker>
          <ScrollLitText
            className="font-display mt-7 text-[clamp(2rem,3.9vw,3.5rem)] leading-[1.14] tracking-tight text-cream"
            accentClassName="italic text-rose-200"
            text="Minha missão é proporcionar atendimento de *excelência,* sempre focado na sua *saúde* e no seu *bem-estar.*"
          />
          <Reveal delay={0.1} className="mt-10 grid max-w-[38rem] gap-4 border-t border-cream/20 pt-8">
            {MISSION.slice(1).map((m) => (
              <p key={m} className="text-pretty text-[18px] leading-relaxed text-cream/90 lg:text-[19px]">
                {m}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <p className="font-display text-[1.9rem] italic text-rose-200">Bianca Albuquerque</p>
            <p className="caps mt-1 text-cream">{DOCTOR.title} · {DOCTOR.registry}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
