/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        trk: {
          gold: "#f1c40f",
          goldSoft: "#f5d142",
          dark: "#0b0b0b",
          darkSoft: "#121212",
        },
      },
      boxShadow: {
        gold: "0 12px 40px rgba(241,196,15,.25)",
      },
    },
  },
  plugins: [],
};
