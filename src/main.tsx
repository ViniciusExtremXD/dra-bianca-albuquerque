import React from "react";
import ReactDOM from "react-dom/client";
// Eixos peso + tamanho óptico: nos títulos grandes a Fraunces fica fina e contrastada, como nos carrosséis.
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/plus-jakarta-sans";
import "./styles.css";
import App from "./App";
import { captureAttribution } from "./lib/attribution";

captureAttribution();

const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// O HTML de produção vem pré-renderizado (scripts/prerender.mjs); em dev o root começa vazio.
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
