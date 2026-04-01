/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"Courier New"', "monospace"],
      },
      colors: {
        bg: "#f8f7f4",
        card: "#ffffff",
        subtle: "#f1f0ed",
        primary: "#1a1916",
        secondary: "#6b6860",
        muted: "#a09d98",
        border: "#e5e3de",
        "border-strong": "#ccc9c2",
        accent: {
          DEFAULT: "#2563eb",
          light: "#dbeafe",
          hover: "#1d4ed8",
        },
        success: { DEFAULT: "#16a34a", light: "#dcfce7" },
        danger: { DEFAULT: "#dc2626", light: "#fee2e2" },
        warning: { DEFAULT: "#d97706", light: "#fef3c7" },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease both",
        "fade-in": "fadeIn 0.4s ease both",
        "spin-slow": "spin 0.9s linear infinite",
        "pulse-dot": "pulseDot 2s infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.3" } },
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        md: "0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
        lg: "0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
