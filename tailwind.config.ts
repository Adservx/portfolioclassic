import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.5" }],
        sm: ["0.9375rem", { lineHeight: "1.6" }],
      },
      fontFamily: {
        heading: ["Archivo", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
        mono: ["Space Grotesk", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "#1E1B4B",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#4F46E5",
          hover: "#6366F1",
          subtle: "#EEF2FF",
          glow: "rgba(79, 70, 229, 0.15)",
          ring: "rgba(79, 70, 229, 0.3)",
        },
        background: "#F8FAFC",
        foreground: "#0F172A",
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#94A3B8",
        },
        border: "#E2E8F0",
        surface: "#FFFFFF",
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#475569",
          foreground: "#FFFFFF",
        },
        ring: "#4F46E5",
        input: "#E2E8F0",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 10px 25px rgba(15, 23, 42, 0.08), 0 4px 10px rgba(15, 23, 42, 0.04)",
        accent: "0 4px 14px rgba(79, 70, 229, 0.25)",
      },
      animation: {
        "pulse-dot": "pulse 2s ease-in-out infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.4)" },
        },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
