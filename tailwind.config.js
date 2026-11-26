/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /*
         * Paleta oficial do brand board da Dra. Bianca: #FCFAF7 · #E3C0BA · #D7A2A0 · #B37D7B · #8E5755.
         * Contraste medido (WCAG):
         *  - creme: títulos rose-500 #8E5755 (5,5:1); itálico rose-400 #B37D7B só em texto grande (3,3:1).
         *  - blush #E3C0BA: texto ink (8,6:1); rosa pequeno = rose-600 #6E4140 (5,0:1).
         *  - rose-400 #B37D7B: só creme GRANDE (3,3:1). Texto pequeno vai num painel rose-500.
         *  - rose-500 #8E5755: creme em qualquer tamanho (5,5:1); blush só grande (3,4:1).
         */
        cream: {
          DEFAULT: "#FCFAF7",
          50: "#FFFEFC",
          100: "#FCFAF7",
          200: "#F6EFEA",
          300: "#EDE1DA",
        },
        rose: {
          100: "#F3E6E2",
          200: "#E3C0BA",
          300: "#D7A2A0",
          400: "#B37D7B",
          500: "#8E5755",
          600: "#6E4140",
          700: "#55302F",
        },
        /* Grafite quente: nada de preto puro. */
        ink: {
          DEFAULT: "#2E2829",
          soft: "#574B4C",
          deep: "#241F20",
        },
      },
      fontFamily: {
        /* Editor's Note é comercial: Fraunces fina, de tamanho óptico alto, faz o papel (alto contraste, itálico elegante). */
        display: ['"Fraunces Variable"', "Georgia", "serif"],
        /* SF Pro nos aparelhos Apple; Inter (servida pelo site) no resto. */
        sans: ["-apple-system", '"SF Pro Display"', "BlinkMacSystemFont", '"Inter Variable"', "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.035em",
        caps: "0.22em",
      },
      /* Sombras longas e claras, tingidas de ameixa (nunca preto) */
      boxShadow: {
        soft: "0 1px 2px rgba(85,48,47,0.04), 0 10px 26px -14px rgba(85,48,47,0.14)",
        card: "0 1px 2px rgba(85,48,47,0.04), 0 16px 36px -18px rgba(85,48,47,0.18), 0 40px 70px -44px rgba(85,48,47,0.22)",
        lift: "0 2px 4px rgba(85,48,47,0.05), 0 22px 46px -22px rgba(85,48,47,0.24), 0 56px 90px -50px rgba(85,48,47,0.3)",
        seal: "0 18px 30px -16px rgba(85,48,47,0.45)",
        plum: "0 14px 30px -16px rgba(85,48,47,0.6)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.35" },
          "100%": { transform: "scale(1.7)", opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(-4deg)" },
          "50%": { transform: "translate3d(0, -8px, 0) rotate(-1deg)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.8s cubic-bezier(0.2, 0.6, 0.3, 1) infinite",
        drift: "drift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
