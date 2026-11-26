import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { DOCTOR, FAQ, MATERNITIES } from "./data/site";

/* Só no build: scripts/prerender.mjs injeta este HTML e o JSON-LD em dist/index.html. */

export function render() {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

const SITE = import.meta.env.VITE_SITE_URL || "/";

export function structuredData() {
  const physician = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE}#medica`,
    name: DOCTOR.name,
    alternateName: DOCTOR.fullName,
    description:
      "Ginecologista e obstetra em Macapá/AP. Pré-natal, consulta ginecológica e prevenção, DIU, Implanon, cirurgia ginecológica e laparoscopia. Atendimento presencial.",
    url: SITE,
    image: `${SITE}images/bianca-blazer.webp`,
    logo: `${SITE}logo-mark.svg`,
    telephone: "+55-96-98114-4205",
    medicalSpecialty: ["Gynecologic", "Obstetric"],
    identifier: [
      { "@type": "PropertyValue", propertyID: "CRM-AP", value: "1752" },
      { "@type": "PropertyValue", propertyID: "RQE", value: "1124" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: DOCTOR.address.street,
      addressLocality: "Macapá",
      addressRegion: "AP",
      postalCode: DOCTOR.address.cep,
      addressCountry: "BR",
    },
    hasMap: DOCTOR.mapsUrl,
    areaServed: { "@type": "City", name: "Macapá" },
    availableService: [
      { "@type": "MedicalProcedure", name: "Pré-natal" },
      { "@type": "MedicalProcedure", name: "Consulta ginecológica de rotina" },
      { "@type": "MedicalProcedure", name: "Inserção de DIU" },
      { "@type": "MedicalProcedure", name: "Implante contraceptivo (Implanon)" },
      { "@type": "MedicalProcedure", name: "Cirurgia ginecológica" },
      { "@type": "MedicalProcedure", name: "Laparoscopia" },
    ],
    hospitalAffiliation: MATERNITIES.map((name) => ({ "@type": "Hospital", name, address: { "@type": "PostalAddress", addressLocality: "Macapá", addressRegion: "AP", addressCountry: "BR" } })),
    contactPoint: [{ "@type": "ContactPoint", telephone: "+55-96-98114-4205", contactType: "reservations", availableLanguage: "Portuguese" }],
    sameAs: [DOCTOR.instagramUrl],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const website = { "@context": "https://schema.org", "@type": "WebSite", name: DOCTOR.name, url: SITE, inLanguage: "pt-BR", publisher: { "@id": `${SITE}#medica` } };

  return [physician, faq, website];
}
