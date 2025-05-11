/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Modern color palette
        primary: {
          DEFAULT: '#6366F1', // Indigo
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        secondary: {
          DEFAULT: '#14B8A6', // Teal
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        background: '#FFFFFF',
        surface: {
          DEFAULT: '#F8FAFC',
          secondary: '#F1F5F9',
        },
        accent: '#F59E0B',
        border: '#E2E8F0',
        error: '#EF4444',
        success: '#22C55E',
        warning: '#F59E0B',
        muted: '#64748B',
      },
      fontFamily: {
        sans: [
          'Inter',
          'SF Pro Text',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        heading: [
          'Inter',
          'SF Pro Display',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
      borderRadius: {
        none: '0',
        sm: '0.375rem',
        DEFAULT: '0.75rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [],
}