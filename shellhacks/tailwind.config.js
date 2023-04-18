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
    colors: {
      deep_blue: "#4A73AC",
      blue: "#006887",
      white: "#FFF",
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      rotate: {
        270: "270deg",
      },
    },
  },
  plugins: [],
};
