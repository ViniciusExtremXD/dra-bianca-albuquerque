import { useReducedMotion } from "framer-motion";

/*
 * Movimento x "reduzir movimento" do sistema: UMA chave para o site inteiro.
 *
 * true  → quem tem "reduzir movimento" ligado no sistema vê a versão calma: os títulos, fotos e linhas
 *         continuam aparecendo (fade, recorte, traço se desenhando), mas sem deslocamento, parallax,
 *         faixa andando ou selo girando, e sem rolagem suave.
 * false → todo mundo vê o movimento completo (era a escolha da Crescer).
 *
 * Atenção: muitos PCs Windows informam "reduzir movimento" só porque os "efeitos de animação" do
 * Windows estão desligados. O navegador deste computador de trabalho informa isso (conferido em 26/11/2026).
 */
export const RESPECT_REDUCED_MOTION = false;

/** true quando o site deve ficar na versão calma. */
export function useCalm(): boolean {
  const reduce = useReducedMotion();
  return RESPECT_REDUCED_MOTION && !!reduce;
}

export function prefersCalm(): boolean {
  if (!RESPECT_REDUCED_MOTION || typeof window === "undefined") return false;
  return !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}
