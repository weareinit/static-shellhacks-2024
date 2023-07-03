/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xmd: "1px",
      },
      gridTemplateColumns: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      colors: {
        deep_blue: "#3C72A7",
        grass_green: "#8EBE6B",
        blue: "#006887",
        white: "#FFF",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        pixel: ["De Pixel", "serif"],
      },
      rotate: {
        270: "270deg",
      },
    },
  },
  plugins: [],
};
