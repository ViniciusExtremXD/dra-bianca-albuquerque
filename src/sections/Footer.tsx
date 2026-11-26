import { motion } from "framer-motion";
import { ArrowUp } from "@phosphor-icons/react";
import { DOCTOR, NAV_LINKS, assetUrl } from "../data/site";
import { EASE_SOFT } from "../components/motion";
import { InstagramLink, MapsLink, WhatsAppLink } from "../components/cta";
import { Monogram } from "../components/brand";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pb-28 pt-20 text-cream-100 md:pb-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <Monogram className="h-16 w-auto" arch="#D9B3AF" letters="#FAF7F3" strokeWidth={1.4} />
              <div>
                <p className="font-display text-2xl text-cream-100">{DOCTOR.name}</p>
                <p className="mt-1 text-sm text-rose-300">{DOCTOR.title}</p>
              </div>
            </div>
            <p className="mt-6 text-sm font-semibold tracking-wide text-cream-100">{DOCTOR.registry}</p>
            <p className="mt-1 text-sm text-cream-100/65">Atendimento presencial em {DOCTOR.city}</p>
          </div>

          <nav className="md:col-span-3" aria-label="Rodapé">
            <p className="font-display text-lg italic text-rose-300">navegue</p>
            <ul className="mt-4 grid gap-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-[44px] items-center text-cream-100/75 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="font-display text-lg italic text-rose-300">contato</p>
            <ul className="mt-4 grid gap-1 text-cream-100/75">
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
                  {DOCTOR.address.street} · {DOCTOR.address.district}
                  <br />
                  {DOCTOR.address.city} · CEP {DOCTOR.address.cep}
                </MapsLink>
              </li>
            </ul>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE_SOFT }}
          className="font-display mt-16 select-none whitespace-nowrap text-[clamp(3rem,11vw,10rem)] leading-none tracking-tightest text-white/[0.06]"
          aria-hidden
        >
          Bianca <span className="italic">Albuquerque</span>
        </motion.p>

        <div className="mt-6 grid gap-4 border-t border-white/10 pt-8 text-xs leading-relaxed text-cream-100/60 md:grid-cols-[1fr_auto] md:items-start">
          <div className="grid gap-1.5">
            <p>
              {DOCTOR.fullName} · {DOCTOR.title} · {DOCTOR.registry}
            </p>
            <p>As informações deste site têm caráter informativo e não substituem a consulta médica. Em emergências, procure o pronto atendimento mais próximo ou ligue 192 (SAMU).</p>
            <p className="flex flex-wrap items-center gap-x-4">
              <span>
                © {new Date().getFullYear()} {DOCTOR.name}
              </span>
              <a href={assetUrl("politica-de-privacidade.html")} className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-cream-100">
                Política de privacidade
              </a>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("bianca:cookies"))}
                className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-cream-100"
              >
                Preferências de cookies
              </button>
            </p>
          </div>
          <a
            href="#topo"
            className="group inline-flex min-h-[44px] items-center gap-2 justify-self-start rounded-full border border-white/15 px-4 text-cream-100/75 transition-colors hover:border-white/40 hover:text-white md:justify-self-end"
          >
            Voltar ao topo <ArrowUp weight="bold" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
