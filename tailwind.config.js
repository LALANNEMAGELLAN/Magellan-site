/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#E2AC2B", dark: "#C99212", fg: "#FFFFFF" },
        surface: { bg: "#F8FAFC", card: "#FFFFFF", border: "#E2E8F0" },
        text: { base: "#0F172A", muted: "#64748B" }
      }
    }
  },
  plugins: []
};



