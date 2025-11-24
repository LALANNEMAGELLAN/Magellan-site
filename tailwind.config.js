/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#0E7490", dark: "#0B556A", fg: "#FFFFFF" },
        accent: { DEFAULT: "#F59E0B", dark: "#D97706" },
        surface: { bg: "#0B1220", card: "#1E293B", border: "#334155" },
        text: { base: "#CBD5E1", muted: "#94A3B8" }
      }
    }
  },
  plugins: []
};



