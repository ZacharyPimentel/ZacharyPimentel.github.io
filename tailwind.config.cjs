/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'md':'768px',
        'lg':'1280px',
        'full':'1920px'
      },
      colors:{
        'pink':'#e6034a',
        'purple':'#23102c'
      }
    },
    fontFamily: {
      'bebasneue': 'BebasNeue',
      'montserrat':'Montserrat'
    }
  },
  plugins: [],
}
