/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"Montserrat"', 'sans-serif'],
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      mint: '#E9F7E6',
      azure: '#E8F2FE',
    },
  },
  plugins: [],
};
