import { motion } from "framer-motion";
import { ArrowUpRight, NavigationArrow } from "@phosphor-icons/react";
import { DOCTOR, MATERNITIES, assetUrl } from "../data/site";
import { ClipReveal, EASE_SOFT, Kicker, ParallaxImage, Petal, Reveal, SplitWords } from "../components/motion";
import { MapsLink } from "../components/cta";

/* "Hoje, atuo nas principais maternidades de Macapá": a frase do carrossel vira o título, com os mesmos itálicos. */
export function Places() {
  return (
    <section id="onde-atendo" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="relative isolate mx-auto w-full max-w-[360px] lg:col-span-5 lg:max-w-none">
          {/* Arco blush atrás da foto */}
          <div aria-hidden className="arch absolute -inset-x-5 -bottom-5 top-10 -z-10 bg-rose-100" />
          <ClipReveal from="bottom" radius={40} className="aspect-[3/4]">
            <ParallaxImage
              src={assetUrl("images/bianca-cadeira.webp")}
              alt="Dra. Bianca Albuquerque sentada numa cadeira, sorrindo"
              width={475}
              height={1112}
              amount={5}
              zoom={1.06}
              position="60% 0%"
              className="h-full w-full rounded-[2.5rem] bg-cream-300"
            />
          </ClipReveal>
        </div>

        <div className="lg:col-span-7">
          <Kicker>onde atendo</Kicker>
          <h2 className="font-display mt-5 text-[clamp(2.3rem,4.8vw,4.1rem)] leading-[1.06] tracking-tightest text-rose-500">
            <SplitWords text="Hoje, *atuo* nas principais maternidades *de* Macapá" />
          </h2>
          <Reveal className="mt-5 max-w-xl">
            <p className="text-pretty text-lg leading-relaxed text-ink-soft">Bem Nascer, Maternidade Mãe Luzia e Hospital São Camilo, além do meu consultório.</p>
          </Reveal>

          {/* Consultório */}
          <Reveal delay={0.1} className="mt-10 rounded-[2rem] bg-cream-50 p-6 shadow-card ring-1 ring-rose-600/5 sm:p-8">
            <p className="font-display text-lg italic text-rose-600">consultório</p>
            <p className="font-display mt-2 text-[1.75rem] leading-tight text-ink sm:text-3xl">{DOCTOR.address.street}</p>
            <p className="mt-1.5 text-ink-soft">
              {DOCTOR.address.district} · {DOCTOR.address.city} · CEP {DOCTOR.address.cep}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <MapsLink
                location="onde_atendo"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-rose-600 px-5 text-sm font-semibold text-white shadow-rose transition-colors hover:bg-rose-700"
              >
                <NavigationArrow weight="fill" className="h-4 w-4" /> Como chegar
              </MapsLink>
              <a href="#contato" className="group inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-rose-700">
                Ver no mapa
                <ArrowUpRight weight="bold" className="h-3.5 w-3.5 rotate-90 transition-transform duration-500 group-hover:translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          {/* Maternidades */}
          <p className="font-display mt-12 text-lg italic text-rose-600">maternidades</p>
          <ul className="mt-3 border-t border-rose-600/15">
            {MATERNITIES.map((m, i) => (
              <motion.li
                key={m}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 1, ease: EASE_SOFT, delay: i * 0.1 }}
                className="group flex items-center gap-4 border-b border-rose-600/15 py-5"
              >
                <Petal className="h-4 w-4 shrink-0 text-rose-400 transition-transform duration-700 group-hover:rotate-90" />
                <span className="font-display text-[1.6rem] leading-tight text-ink transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 sm:text-[2rem]">
                  {m}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
