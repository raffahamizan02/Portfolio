import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-raised": "var(--bg-raised)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        hairline: "var(--hairline)",
        accent: "var(--accent)",
        "accent-strong": "var(--accent-strong)",
        "accent-tint": "var(--accent-tint)",
        focus: "var(--focus)",
        gold: "var(--gold)",
        brand: "var(--brand)",
        "brand-strong": "var(--brand-strong)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
      spacing: {
        "4.5": "1.125rem",
        "6.5": "1.625rem",
        "7.5": "1.875rem",
        "9.5": "2.375rem",
      },
      borderRadius: {
        s: "3px",
        m: "6px",
      },
    },
  },
  plugins: [],
};

export default config;