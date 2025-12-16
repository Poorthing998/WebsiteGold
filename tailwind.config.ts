import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Design system colors from Figma
        primary: {
          main: '#1B2951',
          light: '#2d3f6d',
          lighter: '#D1D4DC',
        },
        secondary: {
          main: '#2C2C2C',
          light: '#9A9A9A',
        },
        surface: {
          main: '#F7F7F9',
          white: '#FFFFFF',
        },
        goldTheme: {
          1: '#C29844',
          2: '#D1B36C',
          3: '#FFF8DC',
          4: '#DEC892',
          5: '#A87919',
          dark: '#9A6A0E',
          darker: '#693805',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
        'gold-coin': 'linear-gradient(180deg, rgba(194, 152, 68, 0.95) 0%, rgba(209, 179, 108, 0.95) 17.51%, rgba(255, 248, 220, 0.95) 53.32%, rgba(222, 200, 146, 0.95) 70.27%, rgba(168, 121, 25, 0.95) 98.21%)',
        'navy-gradient': 'linear-gradient(135deg, #1B2951 0%, #2d3f6d 50%, #1B2951 100%)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'gradient-x': 'gradientX 3s ease infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(202, 138, 4, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(202, 138, 4, 0.6)' },
        },
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(202, 138, 4, 0.25)',
        'gold-lg': '0 8px 32px rgba(202, 138, 4, 0.35)',
        'navy': '0 4px 20px rgba(27, 41, 81, 0.25)',
        'navy-lg': '0 8px 32px rgba(27, 41, 81, 0.35)',
        'soft': '0 2px 8px rgba(10, 13, 18, 0.08)',
        'soft-lg': '0 4px 16px rgba(10, 13, 18, 0.12)',
        'card': '0px 20px 24px -4px rgba(10, 13, 18, 0.08), 0px 8px 8px -4px rgba(10, 13, 18, 0.03)',
      },
    },
  },
  plugins: [],
}
export default config
