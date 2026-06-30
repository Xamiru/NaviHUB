/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          900: '#0f1115',
          800: '#161922',
          700: '#1e2230',
          600: '#2a2f40',
          500: '#3a4055'
        },
        accent: {
          DEFAULT: '#7c5cff',
          hover: '#6a48f0'
        }
      }
    }
  },
  plugins: []
}
