/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e8ecff',
          500: '#5b6cff',
          600: '#4654d8',
          700: '#3740b2',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(91, 108, 255, 0.35)',
      },
    },
  },
  plugins: [],
};
