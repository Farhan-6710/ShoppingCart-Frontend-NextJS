import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Matches all JS, TS, JSX, and TSX files in the pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // Matches all JS, TS, JSX, and TSX files in the components directory
    "./app/**/*.{js,ts,jsx,tsx}", // Matches all JS, TS, JSX, and TSX files in the app directory
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add any additional paths here if you have other directories or files that use Tailwind classes
  ],
  darkMode: "class", // or 'media' based on your preference
  theme: {
    extend: {
      colors: {
        primary: "#1f2937",
        secondary: "#ffe533",
        pink: "#f47779",
        primaryLight: "#f3f4f6",
        primaryDark: "#02081e", // Darker shade for dark mode
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      boxShadow: {
        soft: "0 2px 4px rgba(0, 0, 0, 0.1)", // Soft shadow
        medium: "0 4px 6px rgba(0, 0, 0, 0.1)", // Medium shadow
        intense: "0 0px 13px rgba(0, 0, 0, 0.15)", // Intense shadow
      },
    },
  },
  variants: {
    extend: {
      transitionProperty: ["backgroundColor", "color"], // Add transition support for backgroundColor and color
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

export default config;
