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
      screens: {
        'navbar-custom': '1100px', // 
      },
    },
    variants: {
      extend: {
        display: ['navbar-custom'],
      },
    },
    screens: {
      sm: "530px",
      md: "725px",
      lg: "1024px",
      lgs: "1210px",
      xl: "1600px",
    },
  },
  plugins: [],
};