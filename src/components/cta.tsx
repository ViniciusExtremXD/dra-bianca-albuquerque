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

/* Botão principal: o preenchimento sobe de baixo como uma onda e a seta troca de lugar. */
export function PrimaryCta({
  message,
  location,
  children,
  size = "lg",
  tone = "rose",
  className,
}: {
  location: string;
  message?: string;
  children: React.ReactNode;
  size?: "md" | "lg";
  tone?: "rose" | "cream";
  className?: string;
}) {
  const pad = size === "lg" ? "h-14 pl-6 pr-2 text-[15px]" : "h-12 pl-5 pr-1.5 text-sm";
  const dot = size === "lg" ? "h-10 w-10" : "h-9 w-9";
  const colors = {
    rose: { base: "bg-rose-600 text-white shadow-rose", sweep: "bg-rose-700", dot: "bg-cream-100 text-rose-700" },
    cream: { base: "bg-cream-50 text-rose-700 shadow-float", sweep: "bg-white", dot: "bg-rose-600 text-white" },
  }[tone];
  return (
    <Magnetic>
      <WhatsAppLink
        message={message}
        location={location}
        className={`group relative inline-flex items-center gap-3.5 overflow-hidden whitespace-nowrap rounded-full font-semibold ${colors.base} ${pad} ${className ?? ""}`}
      >
        <span className={`absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${colors.sweep}`} />
        <WhatsappLogo weight="fill" className="relative h-5 w-5 shrink-0" />
        <span className="relative">{children}</span>
        <span className={`relative grid place-items-center overflow-hidden rounded-full ${colors.dot} ${dot}`}>
          <ArrowUpRight weight="bold" className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-6 group-hover:translate-x-6" />
          <ArrowUpRight weight="bold" className="absolute h-4 w-4 -translate-x-6 translate-y-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      </WhatsAppLink>
    </Magnetic>
  );
}

/* Link de texto com sublinhado que se desfaz e refaz no hover. */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={`group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-rose-700 ${className ?? ""}`}>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right bg-rose-400 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-0" />
      </span>
      <ArrowUpRight weight="bold" className="h-3.5 w-3.5 rotate-45 transition-transform duration-500 group-hover:translate-y-0.5" />
    </a>
  );
}
