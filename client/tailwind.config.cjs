/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        third: "#003950",
        fourth: "#0089C2",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        spectral: ["Spectral", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },

      backgroundImage: {
        'colbyBackground': "url('../src/assets/colby-background.png')",
        'harvardBackground': "url('./src/harvard-background.png')",
        'northwesternBackground': "url('./src/northwestern-background.png')",
        'ucsbBackground': "url('./src/ucsb-background.png')",
        'uiucBackground': "url('./src/uiuc-background.png')",
        'stevensonBackground': "url('./src/stevenson-background.png')",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};