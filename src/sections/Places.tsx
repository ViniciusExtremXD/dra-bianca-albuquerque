import { motion } from "framer-motion";
import { NavigationArrow } from "@phosphor-icons/react";
import { DOCTOR, MATERNITIES, assetUrl, shoot } from "../data/site";
import { ClipReveal, CurveTop, EASE_SOFT, Kicker, ParallaxImage, Reveal, SplitWords } from "../components/motion";
import { MapsLink } from "../components/cta";
import { Seal } from "../components/brand";

const PORTRAIT = shoot("terno-bege-sorriso");

/*
 * "Ambiente pensado na sua experiência" (rascunho do Canva) + onde atendo.
 * Bloco blush #E3C0BA: texto ink (8,6:1); rosa pequeno = rose-600 (5:1); títulos ameixa só grandes (3,4:1).
 * A foto do consultório é um recorte (public/images/consultorio-recorte.webp) sem a paciente.
 */
export function Places() {
  return (
    <section id="consultorio" className="relative overflow-x-clip bg-rose-200 pb-28 pt-16 sm:pb-36 sm:pt-20">
      <CurveTop fill="#E3C0BA" />

      <div className="mx-auto grid max-w-[88rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        {/* O consultório real em destaque (no tamanho em que veio: 481 px) e um retrato do ensaio como acento */}
        <div className="relative mx-auto w-full max-w-[520px] lg:col-span-6 lg:max-w-none">
          <div className="relative ml-auto w-[76%] max-w-[400px] lg:mr-[6%]">
            <ClipReveal from="arch" className="aspect-[481/590]">
              <img
                src={assetUrl("images/consultorio-recorte.webp")}
                alt="Dra. Bianca Albuquerque atendendo à mesa no consultório"
                width={481}
                height={590}
                decoding="async"
                className="arch h-full w-full object-cover object-[50%_40%] shadow-card"
              />
            </ClipReveal>
            <Seal className="absolute -left-8 top-[14%] w-[84px] -rotate-6 drop-shadow-[0_14px_16px_rgba(85,48,47,0.35)] sm:-left-12 sm:w-[110px]" />
          </div>
          <div className="absolute -bottom-10 left-0 w-[42%] max-w-[250px] sm:-bottom-14 lg:left-[2%]">
            <ClipReveal from="bottom" radius={26} delay={0.25} className="aspect-[4/5] rounded-[1.6rem] shadow-lift ring-[6px] ring-rose-200">
              <ParallaxImage
                {...PORTRAIT}
                sizes="(min-width: 1024px) 250px, 42vw"
                alt="Retrato da Dra. Bianca Albuquerque de terno bege, sorrindo"
                amount={4}
                position="50% 20%"
                className="h-full w-full rounded-[1.6rem] bg-cream-300"
              />
            </ClipReveal>
          </div>
        </div>

        <div className="mt-10 lg:col-span-6 lg:mt-0">
          <Kicker tone="deep">Consultório</Kicker>
          <h2 className="font-display mt-6 text-[clamp(2.6rem,5.2vw,4.8rem)] leading-[1.02] tracking-tightest text-rose-500">
            <SplitWords text="Ambiente pensado" className="block" />
            <SplitWords text="na sua *experiência*" delay={0.15} className="block" accentClassName="italic text-rose-600" />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[34rem] text-pretty text-[18px] leading-relaxed text-ink lg:text-[19px]">
              Atendo no <strong className="font-semibold">{DOCTOR.clinic}</strong>, no Centro de Macapá, num espaço pensado para você se sentir à vontade em cada consulta.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-9 rounded-[2rem] bg-cream p-6 shadow-card sm:p-8">
            <p className="caps text-rose-500">{DOCTOR.clinic}</p>
            <p className="font-display mt-3 text-[1.7rem] leading-tight text-ink sm:text-[2rem]">{DOCTOR.address.street}</p>
            <p className="mt-1.5 text-ink-soft">
              {DOCTOR.address.district} · {DOCTOR.address.city} · {DOCTOR.address.cep}
            </p>
            <MapsLink
              location="consultorio"
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-full border border-rose-500/30 px-5 text-[14px] font-semibold text-rose-500 transition-colors duration-500 hover:bg-rose-500 hover:text-cream"
            >
              <NavigationArrow weight="fill" className="h-4 w-4" /> Como chegar
            </MapsLink>
          </Reveal>

          <p className="caps mt-12 text-rose-600">Também atuo nas maternidades</p>
          <ul className="mt-4 border-t border-rose-600/25">
            {MATERNITIES.map((m, i) => (
              <motion.li
                key={m}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 1.1, ease: EASE_SOFT, delay: i * 0.1 }}
                className="group border-b border-rose-600/25"
              >
                <span className="font-display block py-4 text-[1.6rem] leading-tight text-ink transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 sm:text-[2rem]">
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
