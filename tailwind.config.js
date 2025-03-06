export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'legend-black': '#262324',
        'legend-gray': '#4B5054',
        'legend-orange': '#FD4F00',
        // Secondary Colors
        'legend-blue': '#98D2E1',
        'legend-green': '#A1CF81',
        'legend-yellow': '#EFDEA4',
        'legend-lime': '#BAD77A',
      },
      fontFamily: {
        sans: ['Syne', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
