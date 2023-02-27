/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          100: "#3B3D3B",
          200: "#181918",
          300: "#0A0A0A",
          400: "#040406",
        },
        lightpink: {
          100: "#D9CAC4"
        },
        lightblue: {
          100: "#CDDFCD"
        },
        lightviolet: {
          100: "#D3C2EB"
        },
        lightwhite: {
          100: "#E4E5E7"
        },
        lightsltate: {
          100: "#252327"
        }
      }
    },
  },
  plugins: [],
}