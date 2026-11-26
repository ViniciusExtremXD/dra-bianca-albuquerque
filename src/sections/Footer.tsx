import { motion } from "framer-motion";
import { ArrowUp } from "@phosphor-icons/react";
import { DOCTOR, NAV_LINKS, assetUrl } from "../data/site";
import { EASE_SOFT } from "../components/motion";
import { InstagramLink, MapsLink, WhatsAppLink } from "../components/cta";
import { Seal } from "../components/brand";

/* Rodapé em ameixa mais fundo (#6E4140): creme 8:1, blush 5:1. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-rose-600 pb-28 pt-20 text-cream md:pb-12">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-5">
              <Seal className="w-[88px] shrink-0 -rotate-6 drop-shadow-[0_12px_14px_rgba(0,0,0,0.3)]" />
              <div>
                <p className="font-display text-[1.7rem] leading-tight text-cream">{DOCTOR.name}</p>
                <p className="mt-1 text-[15px] text-rose-200">{DOCTOR.title}</p>
              </div>
            </div>
            <p className="caps mt-7 text-cream">{DOCTOR.registry}</p>
            <p className="mt-2 text-[15px] text-cream/90">Saúde da mulher · atendimento presencial em {DOCTOR.city}</p>
          </div>

          <nav className="md:col-span-3" aria-label="Rodapé">
            <p className="caps text-rose-200">Navegue</p>
            <ul className="mt-4 grid">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-[44px] items-center text-[16px] text-cream/90 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="caps text-rose-200">Contato</p>
            <ul className="mt-4 grid text-[16px] text-cream/90">
              <li>
                <WhatsAppLink location="rodape" className="inline-flex min-h-[44px] items-center hover:text-white">
                  WhatsApp {DOCTOR.whatsappDisplay}
                </WhatsAppLink>
              </li>
              <li>
                <InstagramLink location="rodape" className="inline-flex min-h-[44px] items-center hover:text-white">
                  @{DOCTOR.instagramHandle}
                </InstagramLink>
              </li>
              <li>
                <MapsLink location="rodape" className="inline-block min-h-[44px] py-2 leading-relaxed hover:text-white">
                  {DOCTOR.clinic} · {DOCTOR.address.street}
                  <br />
                  {DOCTOR.address.district} · {DOCTOR.address.city} · {DOCTOR.address.cep}
                </MapsLink>
              </li>
            </ul>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE_SOFT }}
          className="font-display mt-16 select-none whitespace-nowrap text-[clamp(3rem,11vw,10.5rem)] leading-none tracking-tightest text-cream/[0.08]"
          aria-hidden
        >
          Bianca <span className="italic">Albuquerque</span>
        </motion.p>

        <div className="mt-6 grid gap-4 border-t border-cream/15 pt-8 text-[13px] leading-relaxed text-cream/90 md:grid-cols-[1fr_auto] md:items-start">
          <div className="grid gap-1.5">
            <p>
              {DOCTOR.fullName} · {DOCTOR.title} · {DOCTOR.registry}
            </p>
            <p>As informações deste site têm caráter informativo e não substituem a consulta médica. Em emergências, procure o pronto atendimento mais próximo ou ligue 192 (SAMU).</p>
            <p className="flex flex-wrap items-center gap-x-4">
              <span>© {new Date().getFullYear()} {DOCTOR.name}</span>
              <span>Fotos: Isabela Pimentel</span>
              <a href={assetUrl("politica-de-privacidade.html")} className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-white">
                Política de privacidade
              </a>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("bianca:cookies"))}
                className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-white"
              >
                Preferências de cookies
              </button>
            </p>
          </div>
          <a
            href="#topo"
            className="group inline-flex min-h-[44px] items-center gap-2 justify-self-start rounded-full border border-cream/25 px-5 text-cream/90 transition-colors hover:border-cream/60 hover:text-white md:justify-self-end"
          >
            Voltar ao topo <ArrowUp weight="bold" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
