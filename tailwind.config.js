/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
      },
      colors: {
        bgColor: "#FFF",
        primary: "#0A68FF",
      },
    },
  },
  plugins: [],
};
