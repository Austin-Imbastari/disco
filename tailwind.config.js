/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
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
      darkBg: '#0E0F11',
      darkA: '#1D2023',
      darkP: '#EEF35F',
      darkS: '#7563E8',
    },
  },
  plugins: [],
};
