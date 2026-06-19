import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from the 2 Gals design — no default Tailwind hues.
        teal: { DEFAULT: "#0F4E4E", dark: "#0a3a3a", bright: "#14706b" },
        sage: { DEFAULT: "#B8C8B5", light: "#D9E2C9", mid: "#C9DCC2" },
        cream: "#FCFCFC",
        ink: "#1c2b2b",
        mist: "#E4E6E3",
        moss: "#5a8f7a",
        slate: { soft: "#4a5b58", muted: "#6a7976", faint: "#9aa8a4" },
        line: "#d4dcd9",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
      maxWidth: {
        shell: "1240px",
        content: "1180px",
        quote: "1100px",
      },
      keyframes: {
        floatUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "none" },
        },
        plantFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        floatUp: "floatUp .8s ease both",
        plantFloat: "plantFloat 9s ease-in-out infinite",
        marquee: "marquee 60s linear infinite",
      },
      boxShadow: {
        cta: "0 12px 30px rgba(8,30,30,0.35)",
        card: "0 22px 44px rgba(15,45,30,0.16)",
        float: "0 30px 60px rgba(20,45,30,0.28)",
        header: "0 6px 24px rgba(15,45,30,0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
