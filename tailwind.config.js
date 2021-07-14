module.exports = {
  purge: ["./components/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#1a1a1a',
          800: '#333333',
          700: '#4d4d4d',
          600: '#666666',
          500: '#808080',
          400: '#999999',
          300: '#b3b3b3',
          200: '#cccccc',
          100: '#e6e6e6',
          50: '#f2f2f2'
        }
      }
    },
    container: {
      center: true
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
