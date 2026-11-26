import { ArrowUpRight, InstagramLogo, NavigationArrow, WhatsappLogo } from "@phosphor-icons/react";
import { DOCTOR } from "../data/site";
import { ClipReveal, CurveTop, Kicker, Reveal, SplitWords } from "../components/motion";
import { InstagramLink, MapsLink, PrimaryCta, WhatsAppLink } from "../components/cta";

/* "Endereço e horários" + "Agendar consulta" (rascunho do Canva), na faixa ameixa: creme em qualquer tamanho (5,5:1). */
export function Contact() {
  const row = "group flex min-h-[64px] items-center gap-4 border-b border-cream/20 py-4 transition-colors duration-500 hover:border-cream/60";
  const arrow = <ArrowUpRight weight="bold" className="ml-auto h-4 w-4 shrink-0 text-cream transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />;

  return (
    <section id="contato" className="relative overflow-x-clip bg-rose-500 pb-28 pt-16 text-cream sm:pb-36 sm:pt-20">
      <CurveTop fill="#8E5755" />
      <div className="glow pointer-events-none absolute -left-60 top-20 h-[50rem] w-[50rem] [--glow-a:0.3] [--glow:215_162_160]" />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Kicker tone="cream">Endereço e horários</Kicker>
            <h2 className="font-display mt-6 text-[clamp(2.8rem,5.6vw,5.2rem)] leading-[1] tracking-tightest text-cream">
              <SplitWords text="Vamos" className="block" />
              <SplitWords text="*conversar?*" delay={0.12} className="block" accentClassName="italic text-rose-200" />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md text-pretty text-[18px] leading-relaxed text-cream lg:text-[19px]">
                Quer planejar sua gestação ou cuidar da sua saúde íntima? Agende sua consulta e <em className="font-display text-[1.1em] text-cream">venha conversar comigo!</em>
              </p>
            </Reveal>

            {/* Horário (rascunho do Canva; confirmar com ela) */}
            <Reveal delay={0.15} className="mt-10">
              <p className="caps text-cream">Horário de atendimento</p>
              <dl className="mt-4 border-t border-cream/20">
                {DOCTOR.hours.map((h) => (
                  <div key={h.days} className="flex items-baseline justify-between gap-4 border-b border-cream/20 py-3.5">
                    <dt className="text-[17px] text-cream">{h.days}</dt>
                    <dd className="font-display text-[1.45rem] text-cream">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <PrimaryCta location="contato" tone="cream">
                Agendar consulta
              </PrimaryCta>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ClipReveal radius={36} className="relative overflow-hidden rounded-[2.25rem] bg-rose-600 shadow-lift">
              <div className="relative h-[340px] sm:h-[440px]">
                <iframe
                  title={`Mapa: ${DOCTOR.clinic}, ${DOCTOR.address.oneLine}`}
                  src={DOCTOR.mapsEmbed}
                  className="absolute inset-0 h-full w-full border-0 saturate-[0.75] sepia-[0.15]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </ClipReveal>

            <ul className="mt-8 border-t border-cream/20">
              <li>
                <MapsLink location="contato" className={row}>
                  <NavigationArrow weight="light" className="h-6 w-6 shrink-0 text-cream" />
                  <span className="min-w-0">
                    <span className="caps block text-cream">{DOCTOR.clinic}</span>
                    <span className="font-display mt-1 block text-[1.35rem] leading-snug text-cream sm:text-[1.6rem]">{DOCTOR.address.street}</span>
                    <span className="block text-[15px] text-cream/90">
                      {DOCTOR.address.district} · {DOCTOR.address.city} · {DOCTOR.address.cep}
                    </span>
                  </span>
                  {arrow}
                </MapsLink>
              </li>
              <li>
                <WhatsAppLink location="contato" className={row}>
                  <WhatsappLogo weight="light" className="h-6 w-6 shrink-0 text-cream" />
                  <span>
                    <span className="caps block text-cream">WhatsApp para agendar</span>
                    <span className="font-display mt-1 block text-[1.35rem] text-cream sm:text-[1.6rem]">{DOCTOR.whatsappDisplay}</span>
                  </span>
                  {arrow}
                </WhatsAppLink>
              </li>
              <li>
                <InstagramLink location="contato" className={row}>
                  <InstagramLogo weight="light" className="h-6 w-6 shrink-0 text-cream" />
                  <span className="min-w-0">
                    <span className="caps block text-cream">Instagram</span>
                    <span className="font-display mt-1 block text-[1.05rem] text-cream [overflow-wrap:anywhere] min-[360px]:text-[1.15rem] sm:text-[1.6rem]">@{DOCTOR.instagramHandle}</span>
                  </span>
                  {arrow}
                </InstagramLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
