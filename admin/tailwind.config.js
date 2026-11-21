/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A6DC4',
        'primary-light': '#E8F2FF',
        'primary-dark': '#1255A0',
        secondary: '#00B4D8',
        accent: '#06D6A0',
        surface: '#F8FAFC',
        'text-main': '#0F172A',
        'text-muted': '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 20px rgba(26, 109, 196, 0.08)',
        'card-hover': '0 8px 30px rgba(26, 109, 196, 0.15)',
      }
    }
  },
  plugins: [],
}
