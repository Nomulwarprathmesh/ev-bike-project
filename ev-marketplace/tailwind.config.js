/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#12C48B',
        'primary-dark': '#0ea572',
        'primary-light': '#34D399',
        secondary: '#08B6D8',
        'secondary-dark': '#0891B2',
        accent: '#8B5CF6',
        'accent-pink': '#EC4899',
        'section-primary': '#F8FAFC',
        'section-secondary': '#ECFEFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(15, 23, 42, 0.04)',
        'sm': '0 4px 16px rgba(15, 23, 42, 0.06)',
        'md': '0 8px 32px rgba(15, 23, 42, 0.08)',
        'lg': '0 16px 48px rgba(15, 23, 42, 0.12)',
        'xl': '0 24px 64px rgba(15, 23, 42, 0.16)',
        'card': '0 4px 24px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 12px 40px rgba(15, 23, 42, 0.10)',
        'glow-green': '0 0 40px rgba(18, 196, 139, 0.25), 0 0 80px rgba(18, 196, 139, 0.1)',
        'glow-cyan': '0 0 40px rgba(8, 182, 216, 0.25), 0 0 80px rgba(8, 182, 216, 0.1)',
        'btn': '0 4px 20px rgba(18, 196, 139, 0.35)',
        'btn-hover': '0 8px 30px rgba(18, 196, 139, 0.45)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #12C48B 0%, #08B6D8 100%)',
        'gradient-hero': 'linear-gradient(135deg, #F0FDF4 0%, #ECFEFF 50%, #F0F9FF 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
