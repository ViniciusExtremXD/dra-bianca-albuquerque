# Dra. Bianca Albuquerque · site institucional

Site de uma página da **Dra. Bianca Albuquerque, ginecologista e obstetra em Macapá/AP** (CRM-AP 1752 · RQE 1124).
Mesma base da Crescer Pediatria Integrada: **Vite 5 + React 18 + TypeScript + Tailwind 3 + framer-motion + Lenis + Phosphor**, com o HTML pré-renderizado no build (SEO).
Visual mais suave, tirado do Instagram dela: creme quente, rosa empoeirado, serifada fina com itálicos, arcos.

- Prévia (depois do deploy): https://viniciusextremxd.github.io/dra-bianca-albuquerque/
- **Primeira versão (26/11/2026): ainda NÃO publicada.** Sem repositório remoto, sem deploy.

## Comandos

```bash
npm install
npm run dev          # http://localhost:5182
npm run build        # dist/ com HTML pré-renderizado + JSON-LD
npm run preview      # serve o dist/ em http://localhost:5182
npm run deploy:gh    # build com VITE_BASE=/dra-bianca-albuquerque/ e publica no GitHub Pages (branch gh-pages)
npm run qa           # com o preview rodando: capturas em qa/ (320/360/390/1440 px), rolagem horizontal, alvos de toque, console
```

## Estrutura

```
src/data/site.ts           todo o conteúdo: contato, história, atendimentos, maternidades, dúvidas + trackLead/pushEvent
src/sections/*             Hero, Services (atendimentos), About (sobre mim + história), Places (onde atendo), Steps (como agendar), Faq, Contact, Footer
src/components/brand.tsx   monograma (B reto + A itálico num arco) e assinatura do cabeçalho com CRM/RQE
src/components/brand-paths.ts  contornos do monograma, gerados da própria Fraunces (não depende de fonte carregada)
src/components/motion.tsx  SplitWords, ScrollLitText, Reveal, ParallaxImage, ClipReveal (inclusive em arco), VelocityMarquee, Magnetic, Kicker, Petal
src/components/chrome.tsx  abertura (monograma se desenhando), menu, barra de progresso, WhatsApp flutuante, aviso de cookies (Consent Mode v2)
src/components/cta.tsx     links de WhatsApp, mapa e Instagram, todos com medição
src/lib/motion-pref.ts     A CHAVE do "reduzir movimento" (ver abaixo)
public/                    fotos do ensaio (WebP), favicon/ícones, logo-mark.svg, og-image.jpg, política de privacidade, 404
```

## Identidade

- **Cores** (`tailwind.config.js`): fundo creme `#FAF7F3`; blush `#F3E4E1`; rosa dos títulos `#A06C6B` (4,1:1 sobre o creme, AA para texto grande); rosa de texto e botões `#8E5A5B` (5,2:1; 5,6:1 com texto branco); rosa claro `#B98583` só em decoração; grafite quente `#2E2829` e `#625758` para textos. Nada de preto puro nem rosa saturado.
- **Fontes:** Fraunces (pesos finos, com tamanho óptico: quanto maior o título, mais fina e contrastada) com itálicos de destaque, como nos carrosséis ("Pré-*natal*", "Hoje, *atuo* nas principais maternidades *de* Macapá"); Plus Jakarta Sans no texto.
- **Monograma:** "B" reto e "A" itálico dividindo a barriga do B, dentro de um arco (o mesmo arco das fotos). Feito para este site, não copia marca nenhuma. Favicon em rosa profundo com letras creme.
- **Formas:** arcos nas fotos, raios grandes, sombras claras tingidas de rosa, sem cartões com ícone em quadradinho e sem numeração "01 —".

## Movimento e "reduzir movimento"

O brief pediu para respeitar o `prefers-reduced-motion`. Está ligado em `src/lib/motion-pref.ts` (`RESPECT_REDUCED_MOTION = true`):

- **Movimento completo** (padrão): abertura com o monograma se desenhando e a cortina em arco, títulos palavra por palavra, fotos abrindo em arco, parallax, faixa que acelera com a rolagem, selo girando, rolagem suave (Lenis), botões magnéticos.
- **Versão calma** (sistema com "reduzir movimento"): a abertura continua (é traço + fade), os títulos acendem palavra por palavra (fade), as fotos abrem com recorte e as linhas se desenham, mas **sem deslocamento, parallax, faixa andando, selo girando nem rolagem suave**.
- **Atenção:** o navegador deste computador de trabalho informa "reduzir movimento" (é o caso comum dos PCs Windows com "efeitos de animação" desligados), então aqui o site aparece na versão calma. Para ver o movimento completo, ligue Configurações do Windows > Acessibilidade > Efeitos visuais > Efeitos de animação, ou mude a chave para `false` (todo mundo vê o movimento completo, como na Crescer).

## Medição

- GTM **desligado**: `VITE_GTM_ID` vazio no `.env`. O snippet e o Consent Mode v2 (tudo negado até aceitar) já estão no `index.html`; com um ID preenchido o GTM carrega só fora de localhost/github.io (ou com `?track=1` / `?gtm_debug=x`).
- `trackLead(canal, lugar)` em `src/data/site.ts`: todo clique em WhatsApp, mapa ou Instagram gera `lead_click` com `lead_channel` (`whatsapp` | `maps` | `instagram`), `lead_location` (`hero`, `nav`, `atendimentos`, `contato`, `rodape`…) e `lead_id`. Só o WhatsApp gera `generate_lead` (a conversão); mapa e Instagram ficam como microconversões.
- **Nada de saúde na medição:** nenhum nome de atendimento em evento, a mensagem do WhatsApp é a mesma em todos os botões, as dúvidas não mandam evento ao abrir. Há também `section_view` (id da seção) e `consent_update`.
- Ao ligar o GTM: criar contêiner/GA4 próprios da Dra. Bianca, conversão do Ads só em `generate_lead`, revisar a política de privacidade (item 2 cita as ferramentas de forma genérica).

## SEO

- Título, descrição e Open Graph em português; `og-image.jpg` (1200×630) feita com a foto do blazer, o nome e o CRM/RQE.
- JSON-LD `Physician` (especialidades `Gynecologic` e `Obstetric`, endereço, CRM/RQE como `identifier`, maternidades em `hospitalAffiliation`, Instagram) + `FAQPage` + `WebSite`. Sem coordenadas e sem horário (não confirmados).
- `VITE_SITE_URL` no `.env` define canonical, `og:url`, `og:image` e o JSON-LD. Hoje aponta para a prévia do GitHub Pages.

## Go-live (quando houver domínio)

1. `.env`: `VITE_SITE_URL=https://<dominio>/` (com barra no final).
2. `index.html`: trocar `<meta name="robots" content="noindex" />` por `<meta name="robots" content="index, follow, max-image-preview:large" />`.
3. `public/robots.txt`: trocar `Disallow: /` por `Allow: /` e acrescentar `Sitemap: https://<dominio>/sitemap.xml`; criar `public/sitemap.xml` com a URL do domínio.
4. Se for hospedagem com Apache (HostGator), o `public/.htaccess` já força HTTPS, tira o `www`, comprime e define cache.
5. Ligar a medição (seção acima), se for o caso.

## Regras seguidas

- **CFM (Res. 2.336/2023):** nome, CRM e RQE no cabeçalho (todas as larguras), no hero e no rodapé; sem antes/depois, sem preço, sem "melhor/único", sem promessa de resultado. Dúvidas só com respostas tiradas dos fatos confirmados.
- **Privacidade:** filhos e marido não são nomeados ("meu primeiro filho", "meu segundo filho").
- **Fotos:** só as 6 do ensaio oficial, em WebP no tamanho em que vieram (a base da Crescer não gera tamanhos responsivos nem AVIF). A foto sentada tem um resto de arte rosa na borda esquerda; o site corta com zoom (`zoom={1.06}` em `Places.tsx`).

## A confirmar com a Dra. Bianca

- [ ] **Segundo telefone** que aparece no Google: (96) 98429-2799. Não está no site.
- [ ] **Horário de atendimento** do consultório. Não está no site nem no JSON-LD.
- [ ] Se o WhatsApp (96) 98114-4205 também recebe ligações (hoje o site só oferece mensagem).
- [ ] Nome do consultório no Google (o mapa e o "Como chegar" buscam pelo endereço).
- [ ] Se ela atende convênios e qual a política de valores (o site não fala de nenhum dos dois, de propósito).
- [ ] Autorização de uso das fotos do ensaio e do texto do carrossel "Essa é a Dra. Bianca que você ainda não conhece" no site.
- [ ] Revisão dos textos em primeira pessoa (hero, atendimentos, dúvidas) por ela, principalmente: a descrição da laparoscopia ("menos dor e recuperação mais rápida", texto dela; nas dúvidas foi suavizado com "em geral") e a resposta sobre DIU hormonal × cobre.
- [ ] Domínio definitivo (e hospedagem).
- [ ] Contêiner do GTM / GA4 / Ads, se houver campanha.
- [ ] Revisão jurídica da política de privacidade.
