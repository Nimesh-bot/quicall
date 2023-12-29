/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/**/*.{js,jsx,ts,tsx}",
    "./components/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      xs: "9px",
      sm: "12px",
      default: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "32px",
    },
    borderRadius: {
      none: "0",
      sm: "4px",
      default: "8px",
      md: "12px",
      lg: "14px",
      full: "9999px",
    },
    padding: {
      0: "0px",
      xs: "4px",
      sm: "8px",
      default: "12px",
      lg: "16px",
      xl: "20px",
      "2xl": "40px",
      "3xl": "60px",
      "4xl": "80px",
    },
    margin: {
      0: "0px",
      xs: "4px",
      sm: "8px",
      default: "12px",
      lg: "16px",
      xl: "20px",
      "2xl": "40px",
      "3xl": "60px",
    },
    extend: {
      colors: {
        primary: "#59C9A5",
        danger: "#F44336",
        dark: "#04151F",
        light: "#F0F7F4",
        neutral_black: "#141115",
        neutral_white: "#F7F7F7",
        faded: "#14141515",
      },
    },
  },
  plugins: [],
};