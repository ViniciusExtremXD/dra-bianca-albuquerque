import React from "react";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { DOCTOR, buildWhatsAppUrl, trackLead } from "../data/site";
import { Magnetic } from "./motion";

/*
 * Todo CTA de contato é um <a href> de verdade (wa.me, Google Maps, Instagram), para que gatilhos
 * de clique em link do GTM funcionem. Cada clique também vai ao dataLayer por trackLead(),
 * só com o canal e o lugar do site (nunca o nome de um atendimento).
 */

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function WhatsAppLink({ message, location, children, onClick, ...rest }: AnchorProps & { location: string; message?: string }) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-lead-channel="whatsapp"
      data-lead-location={location}
      onClick={(e) => {
        // Recalcula na hora do clique para incluir a origem do anúncio (utm) que só existe no navegador.
        e.currentTarget.href = buildWhatsAppUrl(message);
        trackLead("whatsapp", location);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function MapsLink({ location, children, onClick, ...rest }: AnchorProps & { location: string }) {
  return (
    <a
      href={DOCTOR.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-lead-channel="maps"
      data-lead-location={location}
      onClick={(e) => {
        trackLead("maps", location);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function InstagramLink({ location, children, onClick, ...rest }: AnchorProps & { location: string }) {
  return (
    <a
      href={DOCTOR.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-lead-channel="instagram"
      data-lead-location={location}
      onClick={(e) => {
        trackLead("instagram", location);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/* Botão principal: o preenchimento sobe de baixo, devagar, e a seta troca de lugar. */
export function PrimaryCta({
  message,
  location,
  children,
  size = "lg",
  tone = "plum",
  className,
}: {
  location: string;
  message?: string;
  children: React.ReactNode;
  size?: "md" | "lg";
  tone?: "plum" | "cream";
  className?: string;
}) {
  const pad = size === "lg" ? "h-14 pl-7 pr-2 text-[15px]" : "h-12 pl-6 pr-1.5 text-[14px]";
  const dot = size === "lg" ? "h-10 w-10" : "h-9 w-9";
  const colors = {
    plum: { base: "bg-rose-500 text-cream shadow-plum", sweep: "bg-rose-600", dot: "bg-cream text-rose-500" },
    cream: { base: "bg-cream text-rose-600 shadow-lift", sweep: "bg-white", dot: "bg-rose-500 text-cream" },
  }[tone];
  return (
    <Magnetic>
      <WhatsAppLink
        message={message}
        location={location}
        className={`group relative inline-flex items-center gap-4 overflow-hidden whitespace-nowrap rounded-full font-semibold tracking-[0.01em] ${colors.base} ${pad} ${className ?? ""}`}
      >
        <span className={`absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${colors.sweep}`} />
        <span className="relative">{children}</span>
        <span className={`relative grid place-items-center overflow-hidden rounded-full ${colors.dot} ${dot}`}>
          <WhatsappLogo weight="fill" className="h-[18px] w-[18px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-7" />
          <ArrowUpRight weight="bold" className="absolute h-4 w-4 translate-y-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
        </span>
      </WhatsAppLink>
    </Magnetic>
  );
}

/* Link de texto com fio fino que se desfaz e refaz no hover. */
export function TextLink({ href, children, className, tone = "plum" }: { href: string; children: React.ReactNode; className?: string; tone?: "plum" | "cream" | "deep" }) {
  // "deep" (#6E4140) é o rosa para texto pequeno sobre o blush (5:1); o ameixa #8E5755 ali só passa em texto grande.
  const color = { plum: "text-rose-500", cream: "text-cream", deep: "text-rose-600" }[tone];
  return (
    <a href={href} className={`group inline-flex min-h-[44px] items-center gap-2.5 text-[15px] font-semibold ${color} ${className ?? ""}`}>
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right bg-current opacity-50 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-0" />
      </span>
      <ArrowUpRight weight="bold" className="h-3.5 w-3.5 rotate-45 transition-transform duration-500 group-hover:translate-y-0.5" />
    </a>
  );
}
