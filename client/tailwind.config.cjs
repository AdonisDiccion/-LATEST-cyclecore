/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      lobster: ["Lobster", "cursive"],
      pop: ["Poppins","sans-serif"],
      sans: ["DM Sans", "sans-serif"],
      raleway: ["Raleway", "sans-serif"],
      varela: ["Varela Round", "sans-serif"],
      signika: ["Signika", "sans-serif"]
    },
  },
  plugins: [],
}