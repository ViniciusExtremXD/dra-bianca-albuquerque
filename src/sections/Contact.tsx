import { motion } from "framer-motion";
import { ArrowUpRight, InstagramLogo, MapPin, NavigationArrow, WhatsappLogo } from "@phosphor-icons/react";
import { DOCTOR } from "../data/site";
import { ClipReveal, EASE_SOFT, Kicker, Reveal, SplitWords } from "../components/motion";
import { InstagramLink, MapsLink, PrimaryCta, WhatsAppLink } from "../components/cta";

export function Contact() {
  const rowCls =
    "group flex min-h-[72px] items-center gap-4 border-b border-rose-600/15 py-4 transition-colors duration-500 hover:border-rose-600/40";
  const label = "block text-[13px] font-medium text-rose-700";
  const value = "font-display block text-[1.3rem] leading-snug text-ink sm:text-2xl";
  const arrow = (
    <ArrowUpRight weight="bold" className="ml-auto h-4 w-4 shrink-0 text-rose-600 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  );

  return (
    <section id="contato" className="relative isolate overflow-hidden bg-rose-100 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow absolute -right-60 -top-40 h-[56rem] w-[56rem] [--glow-a:0.75] [--glow:250_247_243]" />
        <div className="arch absolute -left-24 bottom-[-30%] h-[80%] w-[30rem] border border-white/70" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Kicker>contato</Kicker>
            <h2 className="font-display mt-5 text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02] tracking-tightest text-rose-600">
              <SplitWords text="Vamos *conversar*?" />
            </h2>
            <Reveal className="mt-6 max-w-md">
              <p className="text-pretty text-lg leading-relaxed text-ink">
                Quer planejar sua gestação ou cuidar da sua saúde íntima? Agende sua consulta e <em className="font-display text-[1.08em] text-rose-700">venha conversar comigo!</em>
              </p>
            </Reveal>

            <ul className="mt-9 border-t border-rose-600/15">
              <motion.li initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE_SOFT }}>
                <WhatsAppLink location="contato" className={rowCls}>
                  <WhatsappLogo weight="light" className="h-7 w-7 shrink-0 text-rose-600" />
                  <span>
                    <span className={label}>WhatsApp para agendar</span>
                    <span className={value}>{DOCTOR.whatsappDisplay}</span>
                  </span>
                  {arrow}
                </WhatsAppLink>
              </motion.li>
              <motion.li initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE_SOFT, delay: 0.08 }}>
                <InstagramLink location="contato" className={rowCls}>
                  <InstagramLogo weight="light" className="h-7 w-7 shrink-0 text-rose-600" />
                  <span className="min-w-0">
                    <span className={label}>Instagram</span>
                    <span className="font-display block text-[1.02rem] leading-snug text-ink [overflow-wrap:anywhere] min-[360px]:text-[1.12rem] sm:text-2xl">@{DOCTOR.instagramHandle}</span>
                  </span>
                  {arrow}
                </InstagramLink>
              </motion.li>
              <motion.li initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE_SOFT, delay: 0.16 }}>
                <MapsLink location="contato" className={rowCls}>
                  <MapPin weight="light" className="h-7 w-7 shrink-0 text-rose-600" />
                  <span>
                    <span className={label}>Consultório</span>
                    <span className={value}>{DOCTOR.address.street}</span>
                    <span className="block text-sm text-ink-soft">
                      {DOCTOR.address.district} · {DOCTOR.address.city} · {DOCTOR.address.cep}
                    </span>
                  </span>
                  {arrow}
                </MapsLink>
              </motion.li>
            </ul>

            <Reveal className="mt-9" delay={0.1}>
              <PrimaryCta location="contato">Agendar pelo WhatsApp</PrimaryCta>
            </Reveal>
          </div>

          {/* Mapa (busca pelo endereço, sem chave de API) */}
          <div className="lg:col-span-7">
            <ClipReveal radius={40} className="relative h-full min-h-[420px] overflow-hidden rounded-[2.5rem] bg-cream-200 shadow-lift">
              <iframe
                title={`Mapa: consultório da ${DOCTOR.name}, ${DOCTOR.address.oneLine}`}
                src={DOCTOR.mapsEmbed}
                className="absolute inset-0 h-full w-full border-0 saturate-[0.8] sepia-[0.12]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_SOFT, delay: 0.5 }}
                className="absolute bottom-4 left-4 right-4 rounded-[1.75rem] bg-cream-50/95 p-5 shadow-float backdrop-blur sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-xs sm:p-6"
              >
                <p className="font-display text-lg italic text-rose-600">meu consultório</p>
                <p className="mt-1 font-semibold text-ink">{DOCTOR.address.street}</p>
                <p className="text-sm text-ink-soft">
                  {DOCTOR.address.district}, {DOCTOR.address.city}
                </p>
                <MapsLink
                  location="mapa"
                  className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-rose-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
                >
                  <NavigationArrow weight="fill" className="h-4 w-4" /> Como chegar
                </MapsLink>
              </motion.div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
