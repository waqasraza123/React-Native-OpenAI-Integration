/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        secondary: "#F8F8F8",
        background: "#FFFFFF",
        surface: "#F0F0F5",
        accent: "#8E8E93",
        border: "#D1D1D6",
        error: "#FF3B30",
        success: "#34C759",
      },
      fontFamily: {
        sans: ['SF Pro Text', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        '2xl': "24px",
        '3xl': "30px",
        '4xl': "36px",
      },
      boxShadow: {
        '2xl': "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        'focus': "0 0 0 3px rgba(0, 122, 255, 0.5)",
      },
      spacing: {
        '5px': '5px',
        '7px': '7px',
        '18px': '18px',
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "8px",
        lg: "12px",
        full: "9999px",
      },
      lineHeight: {
        tight: 1.2,
        snug: 1.4,
        normal: 1.5,
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
