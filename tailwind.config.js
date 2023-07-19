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
        dark_brown: "#A1917C",
        crate_brown: "#695E53",
        caramel_brown: "#E2D2BB",
        cyan_blue: "#24B2C0",
        grass_green: "#8EBE6B",
        blue: "#006887",
        pink: "#FF66A4",
        light_pink: "#F1A4C9",
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
      width: {
        tile: "60px",
      },
      backgroundImage: {
        sand: "url('/assets/decorations/sand_tile.png')",
        "shore-line": "url('/assets/decorations/shore_line.gif')",
        water: "url('/assets/decorations/water.gif')",
        grass: "url('/assets/decorations/grass.png')",
        "grass-tile": "url('/assets/decorations/grass_tile.png')",
      },
      backgroundSize: {
        tile: "60px 60px",
      },
      dropShadow: {
        pink: "2px 2px 0 #F1A4C9",
        light_brown: "2px 2px 0 #E2D2BB",
        white: "2px 2px 0 #FFF",
        teal: "2px 2px 0 #24B2C0",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
