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
        'text': '#f0f4f4',
        'background': '#031615',
        'primary': '#78f4ec',
        'secondary': '#4c4b64',
        'accent': '#00d0ff',
       },       
    },
  },
  plugins: [],
}
