/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /*
         * Rosa empoeirado dos carrosséis da Dra. Bianca.
         * Contraste medido (WCAG) sobre o creme #FAF7F3:
         *  400 #B98583 → 2,9:1  só decoração (faixa, ornamentos, linhas), nunca texto
         *  500 #A06C6B → 4,1:1  títulos grandes (AA para texto grande; 3,5:1 sobre o blush)
         *  600 #8E5A5B → 5,2:1  texto pequeno, links e botões (4,5:1 sobre o blush)
         */
        rose: {
          50: "#FBF3F1",
          100: "#F3E4E1",
          200: "#EAD2CD",
          300: "#D9B3AF",
          400: "#B98583",
          500: "#A06C6B",
          600: "#8E5A5B",
          700: "#74494A",
          800: "#5A3839",
        },
        /* Fundo off-white quente dos posts */
        cream: {
          50: "#FFFDFB",
          100: "#FAF7F3",
          200: "#F4EEE7",
          300: "#EADFD3",
        },
        /* Grafite quente: nada de preto puro. ink-soft = 6,5:1 sobre o creme. */
        ink: {
          DEFAULT: "#2E2829",
          soft: "#625758",
          900: "#241F20",
        },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans Variable"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
      /* Sombras longas e claras, tingidas de rosa-grafite (nunca preto) */
      boxShadow: {
        soft: "0 1px 2px rgba(90,56,57,0.04), 0 8px 22px -12px rgba(90,56,57,0.12)",
        card: "0 1px 2px rgba(90,56,57,0.04), 0 12px 30px -14px rgba(90,56,57,0.14), 0 30px 60px -36px rgba(90,56,57,0.18)",
        lift: "0 2px 4px rgba(90,56,57,0.04), 0 18px 40px -18px rgba(90,56,57,0.18), 0 44px 80px -44px rgba(90,56,57,0.24)",
        float: "0 2px 6px rgba(90,56,57,0.05), 0 24px 50px -22px rgba(90,56,57,0.22), 0 60px 100px -56px rgba(90,56,57,0.3)",
        rose: "0 10px 24px -12px rgba(142,90,91,0.5)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
        arch: "999px 999px 2rem 2rem",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.45" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.035)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        typing: {
          "0%, 60%, 100%": { transform: "translateY(0)", opacity: "0.35" },
          "30%": { transform: "translateY(-3px)", opacity: "1" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.2, 0.6, 0.3, 1) infinite",
        "spin-slow": "spin-slow 36s linear infinite",
        breathe: "breathe 9s ease-in-out infinite",
        drift: "drift 8s ease-in-out infinite",
        typing: "typing 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
