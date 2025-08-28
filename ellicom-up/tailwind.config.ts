// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // important for toggling dark/light
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* Light mode colors */
        sea: "#1BD2EB",
        gold: "#F8E539",
        neonSea: "#1BD2EB",
        high: "#FFB300",
        highGold: "#FFFB72",
        ground: "#000321",
        container: "#010210",
        inactive: "#B6AE46",
        head: "#FFFFFF",
        coHead: "#E0E0E0",
        darkSea: "#04132A",
        power: "#000000",

        /* Dark mode colors — note these are NOT automatically applied, you use them with `dark:` */
        // background: "#1b1b1c",
        // surface: "#252526",
        // border: "#2e2e30",
        // borderAlt: "#2a2a2c",
        // textPrimary: "#e5e5e5",
        // textSecondary: "#a1a1a3",
        // textMuted: "#666668",

        // hover: "#0a2d3a",
        // focus: "#ffb300",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
