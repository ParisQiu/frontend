// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        tiffany: "#19c4c4",       // Tiffany Blue (Updated to match login page)
        mint: "#C3EDEB",          // Light Mint Background
        aqua: "#66D1CC",          // Soft Hover Teal
        charcoal: "#2C3E50",      // Deep Gray Text
        softgray: "#E0E0E0"       // Border or Background
      },
    },
  },
  plugins: [],
};
