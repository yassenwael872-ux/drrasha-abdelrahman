import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#008C53", dark: "#005c37", soft: "#e6f4ec" },
        lime: { DEFAULT: "#AEEA00" },
        sun: { DEFAULT: "#FFD600" },
        coral: { DEFAULT: "#FF6F61" },
        ink: "#212121",
        paper: "#F7F9F6",
      },
      fontFamily: {
        arabic: ["'Cairo Variable'", "system-ui", "sans-serif"],
        latin: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(0,140,83,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
