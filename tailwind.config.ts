import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020812",
        foreground: "#FFFFFF",
        navy: {
          900: "#020812",
          950: "#01040a",
        },
        electric: {
          500: "#1B4FD8",
        },
        ice: {
          300: "#B3D5FF",
          400: "#4A9EFF",
        },
        silver: {
          400: "#8899AA",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        ui: ["var(--font-jost)", "sans-serif"],
      },
      borderColor: {
        cold: "rgba(74, 158, 255, 0.15)",
      },
      boxShadow: {
        "blue-glow": "0 0 15px rgba(27, 79, 216, 0.3)",
        "blue-glow-hover": "0 0 25px rgba(74, 158, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;

