import { motion } from "framer-motion";
import { DOCTOR } from "../data/site";
import { MARK_ARCH, MARK_LETTERS, MARK_VIEWBOX } from "./brand-paths";
import { EASE_IN_OUT, EASE_OUT } from "./motion";

/*
 * Monograma: B reto + A itálico (Fraunces fina) dentro de um arco, o mesmo arco das fotos.
 * `draw` desenha o arco e acende as letras (abertura do site).
 */
export function Monogram({
  className,
  arch = "#B98583",
  letters = "#8E5A5B",
  strokeWidth = 1.6,
  draw = false,
  title,
}: {
  className?: string;
  arch?: string;
  letters?: string;
  strokeWidth?: number;
  draw?: boolean;
  title?: string;
}) {
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <motion.path
        d={MARK_ARCH}
        fill="none"
        stroke={arch}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={draw ? { pathLength: 0, opacity: 0 } : false}
        animate={draw ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ pathLength: { duration: 1.3, ease: EASE_IN_OUT }, opacity: { duration: 0.2 } }}
      />
      {MARK_LETTERS.map((l, i) => (
        <motion.path
          key={i}
          d={l.d}
          transform={l.transform}
          fill={letters}
          initial={draw ? { opacity: 0 } : false}
          animate={draw ? { opacity: 1 } : undefined}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.55 + i * 0.18 }}
        />
      ))}
    </svg>
  );
}

/* Monograma + nome + registro. O CRM/RQE fica no cabeçalho em todas as larguras (regra do CFM). */
export function Wordmark({ tone = "light", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) {
  const dark = tone === "dark";
  return (
    <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      <Monogram
        className={compact ? "h-10 w-auto shrink-0" : "h-11 w-auto shrink-0 sm:h-12"}
        arch={dark ? "#D9B3AF" : "#B98583"}
        letters={dark ? "#FAF7F3" : "#8E5A5B"}
      />
      <span className="min-w-0 leading-none">
        <span className={`font-display block whitespace-nowrap text-[15px] tracking-tight min-[360px]:text-[17px] sm:text-[19px] ${dark ? "text-cream-100" : "text-ink"}`}>
          {DOCTOR.name}
        </span>
        <span className={`mt-1 block whitespace-nowrap text-[10.5px] font-medium tracking-wide min-[360px]:text-[11px] ${dark ? "text-rose-300" : "text-rose-600"}`}>
          <span className="hidden sm:inline">Ginecologia e Obstetrícia · </span>
          {DOCTOR.registry}
        </span>
      </span>
    </span>
  );
}
