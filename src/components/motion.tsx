import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { useElementProgress } from "../lib/scroll-progress";
import { useCalm } from "../lib/motion-pref";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
/* Curva lenta e macia: tudo "pousa", nada "bate". */
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

/* Sobe e aparece ao entrar na tela. Com "reduzir movimento", só aparece (o MotionConfig corta o deslocamento). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE_SOFT, delay }}
    >
      {children}
    </Comp>
  );
}

/*
 * Títulos palavra por palavra, subindo de dentro de uma máscara.
 * Palavras entre *asteriscos* ficam em itálico, como nos carrosséis ("Pré-*natal*").
 */
export function SplitWords({
  text,
  className,
  wordClassName,
  accentClassName = "italic",
  delay = 0,
  stagger = 0.07,
  immediate = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const calm = useCalm();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = immediate || inView;
  const words = text.split(" ");
  const plain = text.replace(/\*/g, "");
  // Mesmo ponto de partida no servidor e no navegador (senão a hidratação guarda o transform do HTML pré-renderizado).
  // Na versão calma o MotionConfig pula o deslocamento e sobra só o fade de cada palavra.
  const from = { y: "110%", opacity: 0 };
  const to = { y: "0%", opacity: 1 };
  return (
    <span ref={ref} className={className} aria-label={plain} role="text">
      {words.map((raw, i) => {
        const word = raw.replace(/\*/g, "");
        // Trechos entre asteriscos viram itálico, inclusive dentro da palavra ("Pré-*natal*").
        const parts = raw.split(/(\*[^*]+\*)/).filter(Boolean);
        return (
          <React.Fragment key={`${word}-${i}`}>
            {/* O espaço fica FORA do inline-block (dentro dele, o navegador descarta o espaço do fim). */}
            <span aria-hidden className="-mr-[0.08em] inline-block overflow-hidden pb-[0.14em] pr-[0.08em] align-bottom">
              <motion.span
                className={`inline-block ${wordClassName ?? ""}`}
                initial={from}
                animate={show ? to : undefined}
                transition={{ duration: calm ? 0.9 : 1.2, ease: EASE_SOFT, delay: delay + i * stagger }}
              >
                {parts.map((p, j) =>
                  p.startsWith("*") && p.endsWith("*") ? (
                    <span key={j} className={accentClassName}>
                      {p.slice(1, -1)}
                    </span>
                  ) : (
                    p
                  ),
                )}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </span>
  );
}

/* Parágrafo cujas palavras "acendem" conforme a rolagem. *palavra* = itálico. */
export function ScrollLitText({ text, className, accentClassName = "italic" }: { text: string; className?: string; accentClassName?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const scrollYProgress = useElementProgress(ref, ["start 85%", "end 50%"]);
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <LitWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accentClassName={accentClassName}>
          {word}
        </LitWord>
      ))}
    </p>
  );
}

function LitWord({ children, progress, range, accentClassName }: { children: string; progress: MotionValue<number>; range: [number, number]; accentClassName: string }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const isAccent = /^\*.*\*[.,!?:]?$/.test(children);
  const clean = children.replace(/\*/g, "");
  return (
    <motion.span style={{ opacity }} className={`inline ${isAccent ? accentClassName : ""}`}>
      {clean}{" "}
    </motion.span>
  );
}

/* Puxa o filho na direção do ponteiro, de leve: usado nos CTAs principais. */
export function Magnetic({ children, strength = 0.2, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useCalm();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset} className={`inline-block ${className ?? ""}`}>
      {children}
    </motion.div>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* Faixa infinita que acelera com a rolagem. Só anda perto da tela e para de vez com "reduzir movimento". */
export function VelocityMarquee({ children, baseVelocity = -1, className }: { children: React.ReactNode; baseVelocity?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useCalm();
  const inView = useInView(ref, { margin: "160px 0px 160px 0px" });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 0.8], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);
  const hovering = useRef(false);

  useAnimationFrame((_, delta) => {
    // Para com "reduzir movimento" e enquanto o mouse está em cima (dá para ler com calma).
    if (!inView || reduce || hovering.current) return;
    let moveBy = direction.current * baseVelocity * (Math.min(delta, 64) / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={ref}
      onPointerEnter={(e) => e.pointerType === "mouse" && (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
      className={`flex overflow-hidden whitespace-nowrap ${className ?? ""}`}
    >
      <motion.div className="flex flex-nowrap" style={{ x, willChange: "transform" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* Rótulo de seção: itálico fino com um fio, sem numeração. */
export function Kicker({ children, tone = "light", className }: { children: React.ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Reveal y={10} className={className}>
      <p className={`font-display flex items-center gap-3 text-[1.15rem] italic ${tone === "dark" ? "text-rose-300" : "text-rose-600"}`}>
        <motion.span
          aria-hidden
          className={`h-px w-10 origin-left ${tone === "dark" ? "bg-rose-300/60" : "bg-rose-400"}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE_SOFT, delay: 0.15 }}
        />
        {children}
      </p>
    </Reveal>
  );
}

/* Imagem que desliza levemente durante a rolagem (parallax). Parada com "reduzir movimento". */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  amount = 8,
  eager = false,
  position = "center",
  width,
  height,
  zoom = 1,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  amount?: number;
  eager?: boolean;
  position?: string;
  width?: number;
  height?: number;
  /* Aproximação fixa (corta bordas da foto), somada à do parallax */
  zoom?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useCalm();
  const a = reduce ? 0 : amount;
  const scrollYProgress = useElementProgress(ref, ["start end", "end start"]);
  const y = useTransform(scrollYProgress, [0, 1], [`-${a}%`, `${a}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        /* Sem loading="lazy": dentro de um recorte (clip-path) fechado o navegador só baixa a foto depois que o
           recorte abre, e a revelação anima uma caixa vazia. As fotos são leves (25 a 60 kB). */
        {...{ fetchpriority: eager ? "high" : "low" }}
        decoding="async"
        style={{ y, scale: (1 + a / 40) * zoom, objectPosition: position }}
        className={`h-full w-full object-cover ${imgClassName ?? ""}`}
      />
    </div>
  );
}

/* Revela fotos e painéis com um recorte (clip-path). "arch" abre de baixo para cima com o topo redondo. */
export function ClipReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  radius = 32,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right" | "arch";
  radius?: number;
}) {
  const hidden = {
    bottom: `inset(100% 0% 0% 0% round ${radius}px)`,
    left: `inset(0% 100% 0% 0% round ${radius}px)`,
    right: `inset(0% 0% 0% 100% round ${radius}px)`,
    arch: "inset(100% 0% 0% 0% round 999px 999px 32px 32px)",
  }[from];
  const shown = from === "arch" ? "inset(0% 0% 0% 0% round 999px 999px 32px 32px)" : `inset(0% 0% 0% 0% round ${radius}px)`;
  return (
    <motion.div
      className={className}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: shown }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.4, ease: EASE_IN_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Florzinha de quatro pétalas, separador da faixa e ornamento (desenhada aqui, nenhum ícone de banco). */
export function Petal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2c1.6 3.2 1.6 6.4 0 9.2C10.4 8.4 10.4 5.2 12 2Zm0 20c-1.6-3.2-1.6-6.4 0-9.2 1.6 2.8 1.6 6 0 9.2ZM2 12c3.2-1.6 6.4-1.6 9.2 0-2.8 1.6-6 1.6-9.2 0Zm20 0c-3.2 1.6-6.4 1.6-9.2 0 2.8-1.6 6-1.6 9.2 0Z"
      />
    </svg>
  );
}
