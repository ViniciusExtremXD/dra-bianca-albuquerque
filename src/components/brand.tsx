import { DOCTOR, SEAL, assetUrl } from "../data/site";

/* O selo de cera oficial (brand kit). Nunca redesenhado: sempre a imagem. */
export function Seal({ className, alt = "", eager = false }: { className?: string; alt?: string; eager?: boolean }) {
  return (
    <img
      src={assetUrl(SEAL.src)}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={SEAL.width}
      height={SEAL.height}
      decoding="async"
      loading={eager ? "eager" : undefined}
      className={className}
      draggable={false}
    />
  );
}

/* Cabeçalho: selo pequeno + nome na serifada + CRM/RQE embaixo (regra do CFM, em todas as larguras). */
export function Wordmark({ tone = "light", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) {
  const dark = tone === "dark";
  return (
    <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      <Seal className={`${compact ? "h-10" : "h-10 sm:h-11"} w-auto shrink-0 drop-shadow-[0_4px_6px_rgba(85,48,47,0.25)]`} eager />
      <span className="min-w-0 leading-none">
        <span className={`font-display block whitespace-nowrap text-[16px] tracking-tight min-[360px]:text-[17.5px] sm:text-[20px] ${dark ? "text-cream" : "text-ink"}`}>
          {DOCTOR.name}
        </span>
        <span className={`mt-1.5 block whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] min-[360px]:text-[10.5px] ${dark ? "text-rose-200" : "text-rose-500"}`}>
          {DOCTOR.registry}
        </span>
      </span>
    </span>
  );
}
