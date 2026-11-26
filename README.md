# Dra. Bianca Albuquerque · site institucional

Site de uma página da **Dra. Bianca Albuquerque, ginecologista e obstetra em Macapá/AP** (CRM-AP 1752 · RQE 1124).
Mesma base da Crescer Pediatria Integrada: **Vite 5 + React 18 + TypeScript + Tailwind 3 + framer-motion + Lenis + Phosphor**, com o HTML pré-renderizado no build (SEO).
Identidade do brand kit oficial dela (paleta, selo de cera) e fotos do ensaio da Isabela Pimentel (jun/2025).

- Repositório: https://github.com/ViniciusExtremXD/dra-bianca-albuquerque (branch `main`)
- Prévia: https://viniciusextremxd.github.io/dra-bianca-albuquerque/ (branch `gh-pages`, fora dos buscadores)

## Comandos

```bash
npm install
npm run dev          # http://localhost:5182
npm run build        # dist/ com HTML pré-renderizado + JSON-LD
npm run preview      # serve o dist/ em http://localhost:5182
npm run deploy:gh    # build com VITE_BASE e VITE_SITE_URL da prévia e publica no GitHub Pages (branch gh-pages)
npm run qa           # com o preview rodando: capturas em qa/ (320/360/390/1440 px), rolagem horizontal, alvos de toque, console
```

## Estrutura

```
src/data/site.ts           todo o conteúdo: contato, horário, sobre/missão, história, atendimentos, dúvidas + trackLead/pushEvent + shoot()
src/sections/*             Hero, About (Sobre mim + Mission), Services, Story (história + pausa editorial), Places (consultório), Faq, Contact, Footer
src/components/brand.tsx   selo de cera (imagem oficial) e assinatura do cabeçalho com CRM/RQE
src/components/motion.tsx  SplitWords, ScrollLitText, Reveal, ParallaxImage (com srcSet), ClipReveal, VelocityMarquee, Magnetic, Kicker, CurveTop, Heart
src/components/chrome.tsx  abertura (selo "carimbando"), menu, barra de progresso, WhatsApp flutuante, aviso de cookies compacto (Consent Mode v2)
src/components/cta.tsx     links de WhatsApp, mapa e Instagram, todos com medição
src/lib/motion-pref.ts     chave do "reduzir movimento" (hoje false: movimento completo para todos, como na Crescer)
public/images/ensaio/      ensaio oficial, cada foto em 720 e 1200 px (srcset)
public/images/             selo-bianca.webp, consultorio-recorte.webp, bianca-pre-natal.webp, bianca-cirurgia.webp
fontes-originais/          (fora do git e do site) consultório original, que mostra a paciente, e o selo em PNG
```

## Identidade

- **Paleta oficial** (brand board): `#FCFAF7` fundo · `#E3C0BA` blush · `#D7A2A0` · `#B37D7B` rosa · `#8E5755` ameixa. Derivado: `#6E4140` (rodapé e rosa de texto pequeno sobre o blush).
- **Ritmo dos blocos:** creme (hero, sobre mim com painel blush) → ameixa (missão) → rosa `#B37D7B` (atendimentos) → creme (história) → blush (consultório) → creme (dúvidas) → ameixa (endereço e horários) → `#6E4140` (rodapé). Transições em curva (`CurveTop`).
- **Contraste (WCAG, medido):** creme: títulos `#8E5755` 5,5:1, itálico `#B37D7B` só grande (3,3:1). Blush: texto grafite 8,6:1, rosa pequeno `#6E4140` 5,0:1. Rosa `#B37D7B`: creme só em texto grande (3,3:1); texto pequeno em `#241F20` (4,7:1) ou dentro de painel ameixa. Ameixa: creme em qualquer tamanho (5,5:1); blush só grande (3,4:1).
- **Fontes:** Editor's Note (do brand kit) é comercial; no lugar dela, Fraunces fina (peso 300, tamanho óptico alto, SOFT 0/WONK 0) com itálicos de destaque. Texto: `-apple-system, "SF Pro Display", BlinkMacSystemFont, Inter` (SF Pro nos aparelhos Apple; Inter servida pelo site no resto), 17 px no celular e 18 px no desktop.
- **Logo:** o selo de cera oficial (`public/images/selo-bianca.webp`), nunca redesenhado: cabeçalho, hero (sobre a borda da foto), missão, consultório, rodapé, abertura, favicon e og-image.
- **Detalhes:** versalete espaçado ("SAÚDE DA MULHER ♡"), fios finos, arcos nas fotos, sombras claras tingidas de ameixa, grão de papel sutil no desktop.

## Movimento

`RESPECT_REDUCED_MOTION = false` em `src/lib/motion-pref.ts`: todo mundo vê o movimento completo (abertura com o selo, títulos palavra por palavra, fotos abrindo em arco, parallax leve, faixa que acelera com a rolagem, linha da história se desenhando, rolagem suave). Com `true`, quem tem "reduzir movimento" no sistema vê só fades e recortes.

Medido no headless (26/11/2026): 61 fps parado e rolando, em 390 e 1440 px.

## Medição

- GTM **desligado**: `VITE_GTM_ID` vazio no `.env`. O snippet e o Consent Mode v2 (tudo negado até aceitar) já estão no `index.html`; com um ID preenchido o GTM carrega só fora de localhost/github.io (ou com `?track=1` / `?gtm_debug=x`).
- `trackLead(canal, lugar)` em `src/data/site.ts`: todo clique em WhatsApp, mapa ou Instagram gera `lead_click` com `lead_channel` (`whatsapp` | `maps` | `instagram`), `lead_location` (`hero`, `nav`, `atendimentos`, `consultorio`, `contato`, `rodape`…) e `lead_id`. Só o WhatsApp gera `generate_lead` (a conversão).
- **Nada de saúde na medição:** nenhum nome de atendimento em evento, a mensagem do WhatsApp é a mesma em todos os botões, abrir uma dúvida ou um atendimento não manda evento. Há também `section_view` (id da seção) e `consent_update`.
- Ao ligar o GTM: criar contêiner/GA4 próprios da Dra. Bianca, conversão do Ads só em `generate_lead`, revisar a política de privacidade.

## SEO

- Título, descrição e Open Graph em português; `og-image.jpg` (1200×630) com a foto do ensaio, o selo, o nome e o CRM/RQE.
- JSON-LD `Physician` (especialidades `Gynecologic` e `Obstetric`, endereço do Spazio Vita, horário, CRM/RQE como `identifier`, maternidades em `hospitalAffiliation`, Instagram) + `FAQPage` + `WebSite`.
- `VITE_SITE_URL` (`.env` e `build:gh`) define canonical, `og:url`, `og:image` e o JSON-LD.

## Go-live (quando houver domínio)

1. `.env`: `VITE_SITE_URL=https://<dominio>/` (com barra no final).
2. `index.html`: trocar `<meta name="robots" content="noindex" />` por `<meta name="robots" content="index, follow, max-image-preview:large" />`.
3. `public/robots.txt`: trocar `Disallow: /` por `Allow: /` e acrescentar `Sitemap: https://<dominio>/sitemap.xml`; criar `public/sitemap.xml` com a URL do domínio.
4. Se for hospedagem com Apache (HostGator), o `public/.htaccess` já força HTTPS, tira o `www`, comprime e define cache.
5. Ligar a medição (seção acima), se for o caso.

## Regras seguidas

- **CFM (Res. 2.336/2023):** nome, CRM e RQE no cabeçalho (todas as larguras), no hero, na missão e no rodapé; sem antes/depois, sem preço, sem "melhor/único", sem promessa de resultado. Dúvidas só com respostas tiradas dos fatos confirmados.
- **Privacidade:** filhos e marido não são nomeados. A foto do consultório é um recorte (`consultorio-recorte.webp`, y 40–630 do original) sem a paciente; o original fica fora do site e do git.
- **Fotos:** só as do ensaio oficial (crédito "Fotos: Isabela Pimentel" no rodapé), a do consultório, a do ultrassom (no tamanho em que veio, ≤ 200 px, nunca ampliada) e a do centro cirúrgico (≤ 300 px). A marca d'água da fotógrafa não foi escondida de propósito.

## A confirmar com a Dra. Bianca

- [ ] **Horário** "segunda a sexta, 08h às 18h; sábado, 08h às 12h": veio de um rascunho do Canva. Está no site e no JSON-LD.
- [ ] **Bairro:** o rascunho diz "Centro"; o Google diz "Central". O site usa "Centro".
- [ ] Se o mapa deve buscar pelo nome **Spazio Vita** (hoje busca pelo endereço, que é garantido).
- [ ] **Segundo telefone** que aparece no Google: (96) 98429-2799. Não está no site.
- [ ] Se o WhatsApp (96) 98114-4205 também recebe ligações (hoje o site só oferece mensagem).
- [ ] Se ela atende convênios e qual a política de valores (o site não fala de nenhum dos dois, de propósito).
- [ ] Autorização de uso das fotos (ensaio, consultório) e do texto do carrossel "Essa é a Dra. Bianca que você ainda não conhece".
- [ ] Revisão dos textos em primeira pessoa por ela, principalmente: "Prazer, sou a Dra. Bianca" (título do Sobre mim), "Ambiente pensado na sua experiência" (texto sobre o Spazio Vita), a descrição da laparoscopia ("menos dor e recuperação mais rápida", texto dela; nas dúvidas foi suavizado com "em geral") e a resposta sobre DIU hormonal × cobre.
- [ ] Missão (texto dela): "atendimento de excelência" e "as melhores opções" ficaram como ela escreveu; vale ela confirmar à luz da Res. CFM 2.336/2023.
- [ ] Domínio definitivo (e hospedagem).
- [ ] Contêiner do GTM / GA4 / Ads, se houver campanha.
- [ ] Revisão jurídica da política de privacidade.
