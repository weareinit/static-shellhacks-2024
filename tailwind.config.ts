/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        darker_cyan: "#005871",
        greyish_brown: "#78644F", // regular brown ("Apply" button
        ferra: "#784F46", // social media icons
        pastel_orange: "#FA984A", // lava section
        english_walnut: "#3E3022", // dark-brown fonts
        cotton_seed: "#C8BCB1", // unfocused buttons
        reddish_grey: "#786450", // focused buttons
        light_brown: "#8A715C" // faq bg
      },
      fontFamily: {
        'zoonaji': ['zoonaji', 'sans-serif'],
        'museo': ['museo', 'sans-serif'],
        'museoregular': ['museoregular', 'sans-serif'],
        'museoitalic': ['museoitalic', 'sans-serif'],
      },

      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
