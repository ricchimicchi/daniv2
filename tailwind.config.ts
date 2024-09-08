import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "7xl": { max: "1400px" },
      "6xl": { max: "1320px" },
      "5xl": { max: "1090px" },
      "4xl": { max: "992px" },
      "3xl": { max: "830px" },
      "2xl": { max: "768px" },
      "1xl": { max: "500px" },
      "sm": { max: "400px" },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
