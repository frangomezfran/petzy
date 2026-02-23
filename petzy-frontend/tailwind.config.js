/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'petzy-lavanda': '#B09CD8',
        'petzy-rosa': '#F7A191',
        'petzy-verde-claro': '#C8EAD1',
        'petzy-verde-oscuro': '#699A9B',
        'petzy-negro': '#393C46',
        'petzy-crema': '#EFE4B0',
        'petzy-crema-oscuro': '#D8CE9F',
      }
    },
  },
  plugins: [],
}
