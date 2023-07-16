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
        crate_brown: "#6B5E51",
        navbar_background: "#E5D1B8",
        cyan_blue: "#24B2C0",
        caramel_brown: "#A59079",
        grass_green: "#8EBE6B",
        blue: "#006887",
        pink: "#FF66A4",
        white: "#FFF",
        tan: "#F9EDE3",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        pixel: ["Small Pixel", "serif"],
        console: ["Broken Console", "serif"],
      },
      rotate: {
        270: "270deg",
      },
    },
  },
  plugins: [],
};
