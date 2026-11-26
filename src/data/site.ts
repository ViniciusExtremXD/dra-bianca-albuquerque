/*
 * Conteúdo do site. Fontes: Instagram oficial @biancasantanaalbuquerque (bio, carrossel
 * "Essa é a Dra. Bianca que você ainda não conhece", legendas dos serviços) e o perfil do
 * consultório no Google. Só entra aqui o que foi confirmado; o resto está no README ("a confirmar").
 */

import { originTag } from "../lib/attribution";

export const DOCTOR = {
  name: "Dra. Bianca Albuquerque",
  fullName: "Dra. Bianca Santana Albuquerque",
  title: "Ginecologista e Obstetra",
  /* Exigência do CFM (Res. 2.336/2023): nome, CRM e RQE sempre visíveis. */
  crm: "CRM-AP 1752",
  rqe: "RQE 1124",
  registry: "CRM-AP 1752 · RQE 1124",
  city: "Macapá/AP",
  whatsappDisplay: "(96) 98114-4205",
  whatsappNumber: "5596981144205",
  instagramHandle: "biancasantanaalbuquerque",
  instagramUrl: "https://www.instagram.com/biancasantanaalbuquerque/",
  address: {
    street: "Av. Henrique Galucio, 1054",
    district: "Central",
    city: "Macapá - AP",
    cep: "68900-115",
    oneLine: "Av. Henrique Galucio, 1054 - Central, Macapá - AP, 68900-115",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Henrique+Galucio%2C+1054+-+Central%2C+Macap%C3%A1+-+AP%2C+68900-115",
  mapsEmbed: "https://www.google.com/maps?q=Av.+Henrique+Galucio,+1054+-+Central,+Macap%C3%A1+-+AP,+68900-115&hl=pt-BR&z=16&output=embed",
};

export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.endsWith("/") ? base : `${base}/`}${path.replace(/^\//, "")}`;
}

/* Uma mensagem só para todos os botões: o texto do WhatsApp nunca leva o nome de um procedimento (dado de saúde). */
export const DEFAULT_WA_MESSAGE = "Olá! Vim pelo site da Dra. Bianca Albuquerque e gostaria de agendar uma consulta.";
export const QUESTION_WA_MESSAGE = "Olá! Vim pelo site da Dra. Bianca Albuquerque e tenho uma dúvida.";

export function buildWhatsAppUrl(message: string = DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${DOCTOR.whatsappNumber}?text=${encodeURIComponent(withOrigin(message))}`;
}

/* Leva a origem do anúncio (utm_source / utm_campaign ou gclid) para a conversa, para quem atende saber de onde veio o contato. */
function withOrigin(message: string): string {
  const tag = originTag();
  return tag ? `${message}\n\n${tag}` : message;
}

/* ───────────────────────── Medição (ver README, "Medição") ───────────────────────── */

export type LeadChannel = "whatsapp" | "maps" | "instagram";

export function pushEvent(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

const lastLead: Partial<Record<LeadChannel, number>> = {};

function newLeadId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Clique em WhatsApp, mapa ou Instagram.
 * - Sempre sai `lead_click` com o canal e o lugar do site onde a pessoa clicou. Nada além disso:
 *   nenhum dado de saúde, nenhum nome de procedimento, nenhum dado do visitante.
 * - `generate_lead` (a conversão) só sai no WhatsApp, que é o agendamento de verdade.
 *   Mapa e Instagram ficam como microconversões, para não inflar as conversões dos anúncios.
 * - `lead_id` é único por clique (vai como "ID da transação" no Google Ads, que descarta repetidos).
 * - Toque duplo (mesmo canal em menos de 2 s) conta uma vez só.
 */
export function trackLead(channel: LeadChannel, location: string) {
  const now = Date.now();
  if (now - (lastLead[channel] ?? 0) < 2000) return;
  lastLead[channel] = now;
  const lead_id = newLeadId();
  pushEvent("lead_click", { lead_channel: channel, lead_location: location, lead_id });
  if (channel === "whatsapp") pushEvent("generate_lead", { method: channel, link_location: location, lead_id });
}

/* ───────────────────────── Navegação ───────────────────────── */

export const NAV_LINKS = [
  { href: "#atendimentos", label: "Atendimentos" },
  { href: "#sobre", label: "Sobre mim" },
  { href: "#onde-atendo", label: "Onde atendo" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

/* ───────────────────────── Minha história ───────────────────────── */
/* Do carrossel "Essa é a Dra. Bianca que você ainda não conhece". Sem nomes de filhos ou marido (privacidade). */

export const STORY: { when: string; title: string; text: string }[] = [
  {
    when: "2014",
    title: "De Belém para Macapá",
    text: "Sou a caçula de três irmãos. Em 2014, saí de Belém para estudar Medicina na UNIFAP, aqui em Macapá.",
  },
  {
    when: "2016",
    title: "Mãe durante a faculdade",
    text: "Meu primeiro filho nasceu em 2016, no meio do curso. Com o apoio da minha família, me formei sem atrasar nenhum semestre.",
  },
  {
    when: "Internato",
    title: "Pelo interior do Amapá",
    text: "Grávida do meu segundo filho, atendi comunidades indígenas e trabalhei em lugares como Oiapoque e Mazagão.",
  },
  {
    when: "2020",
    title: "Dois filhos, um só aniversário",
    text: "Meu segundo filho nasceu no mesmo dia do aniversário do irmão! Fiz uma pausa para cuidar dos dois.",
  },
  {
    when: "2021",
    title: "Residência",
    text: "Comecei a residência em Ginecologia e Obstetrícia na UNIFAP.",
  },
  {
    when: "2024",
    title: "Especialista e videolaparoscopia",
    text: "Terminei a residência e fiz o curso de videolaparoscopia, concluído em dezembro.",
  },
];

export const MISSION =
  "Sou apaixonada pela Medicina, pelo cuidado com as mulheres e por estar presente nos momentos mais importantes da vida delas.";
export const MISSION_GOAL =
  "Na ginecologia ou obstetrícia, meu objetivo é oferecer um atendimento humano, acolhedor e que faça a diferença na vida das minhas pacientes.";

/* ───────────────────────── Atendimentos (descrições da própria Dra. Bianca) ───────────────────────── */

export const PRENATAL = {
  name: "Pré-natal",
  text: "Acompanhamento completo da gestante, monitorando a saúde da mãe e do bebê em todas as fases da gravidez.",
};

export const CARE: { id: string; name: string; text: string; note: string }[] = [
  {
    id: "ginecologia",
    name: "Ginecologia e prevenção",
    text: "Consulta ginecológica de rotina para cuidar da sua saúde íntima e manter a prevenção em dia.",
    note: "Um bom momento para tirar dúvidas e conversar sobre os seus planos.",
  },
  {
    id: "diu",
    name: "DIU",
    text: "Um método contraceptivo seguro, que previne a gravidez por anos sem precisar lembrar todos os dias.",
    note: "Pode ser hormonal ou de cobre.",
  },
  {
    id: "implanon",
    name: "Implanon",
    text: "Implante contraceptivo altamente eficaz, discreto e de longa duração. Perfeito para quem quer praticidade e segurança no planejamento familiar.",
    note: "A Anvisa aprovou a extensão da eficácia contraceptiva para 5 anos.",
  },
];

export const SURGERY = [
  {
    name: "Cirurgia ginecológica",
    text: "Procedimentos minimamente invasivos ou tradicionais para tratar endometriose, miomas, cistos e outras condições.",
  },
  {
    name: "Laparoscopia",
    text: "Cirurgia por vídeo, com cortes pequenos, menos dor e recuperação mais rápida. Indicada para endometriose, miomas, cistos e até gravidez ectópica.",
  },
];

/* ───────────────────────── Onde atendo ───────────────────────── */

export const MATERNITIES = ["Bem Nascer", "Maternidade Mãe Luzia", "Hospital São Camilo"];

/* ───────────────────────── Dúvidas (só o que sai dos fatos confirmados; sem preço, sem convênio, sem promessa) ───────────────────────── */

export const FAQ = [
  {
    q: "Gravidez ou prevenção: como saber o que é melhor para mim?",
    a: "É para isso que serve a consulta. A gente conversa sobre os seus planos (engravidar agora, mais para frente ou não engravidar) e, juntas, decidimos o caminho: pré-natal, planejamento da gestação ou um método contraceptivo, como o DIU ou o Implanon.",
  },
  {
    q: "O que é a laparoscopia?",
    a: "É a cirurgia feita por vídeo: em vez de um corte grande, são feitos cortes pequenos, por onde passam uma câmera e os instrumentos. Em geral, causa menos dor e a recuperação é mais rápida. Pode ser indicada para endometriose, miomas, cistos e até gravidez ectópica (quando a gestação se forma fora do útero). Se a cirurgia é indicada para você, e de que tipo, é algo que avaliamos na consulta.",
  },
  {
    q: "Qual a diferença entre o DIU hormonal e o de cobre?",
    a: "Os dois são DIUs (dispositivos colocados dentro do útero) que previnem a gravidez por anos, sem você precisar lembrar todos os dias. O hormonal libera hormônio; o de cobre não tem hormônio. Qual combina mais com você, a gente decide junto na consulta.",
  },
  {
    q: "Quanto tempo dura o Implanon?",
    a: "O Implanon é um implante contraceptivo discreto e de longa duração. A Anvisa aprovou a extensão da sua eficácia contraceptiva para 5 anos.",
  },
  {
    q: "Onde a Dra. Bianca atende?",
    a: `As consultas são presenciais, no meu consultório: ${DOCTOR.address.oneLine}. Também atuo nas maternidades Bem Nascer, Maternidade Mãe Luzia e no Hospital São Camilo.`,
  },
  {
    q: "Como faço para agendar?",
    a: `Pelo WhatsApp ${DOCTOR.whatsappDisplay}. É só mandar uma mensagem dizendo que quer agendar e combinamos o dia e o horário por lá.`,
  },
];
