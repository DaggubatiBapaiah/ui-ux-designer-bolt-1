/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
      colors: {
        ink: {
          50: '#f7f4f0',
          100: '#efe9e1',
          200: '#dcd3c6',
          300: '#c4b8a6',
          400: '#a89880',
          500: '#8a7a63',
          600: '#6e5f4d',
          700: '#544739',
          800: '#3a3128',
          900: '#241e19',
          950: '#15110e',
        },
        accent: {
          50: '#fdf6f0',
          100: '#fae8d8',
          200: '#f4d0b0',
          300: '#ecaf7e',
          400: '#e28c4d',
          500: '#d97757',
          600: '#c25e3a',
          700: '#a14a30',
          800: '#823d2c',
          900: '#6b3527',
        },
        sage: {
          400: '#8fa886',
          500: '#6f8e6a',
          600: '#5a7355',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'slide-in-right': 'slideIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
      },
    },
  },
  plugins: [],
};
