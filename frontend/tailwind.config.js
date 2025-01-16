/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#6187b3',  // Adiciona sua cor personalizada
      },
    },
  },
  plugins: [],
}