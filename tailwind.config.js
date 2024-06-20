/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/routes/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/utils/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'text': 'hsl(328, 86%, 95%)',
        'background': 'hsl(330, 53%, 6%)',
        'primary': 'hsl(329, 83%, 72%)',
        'secondary': 'hsl(169, 83%, 30%)',
        'accent': 'hsl(235, 82%, 53%)',
      },

    },
  },
  plugins: [],
}
