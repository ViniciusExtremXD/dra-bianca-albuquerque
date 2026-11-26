/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Endereço público do site, com barra no final (canonical, Open Graph, JSON-LD). */
  readonly VITE_SITE_URL: string;
  /** ID do contêiner do Google Tag Manager. Vazio = medição desligada. */
  readonly VITE_GTM_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
