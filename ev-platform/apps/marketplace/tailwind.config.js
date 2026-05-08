/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#12C48B",
        "primary-dark": "#0ea572",
        "primary-light": "#34D399",
        secondary: "#08B6D8",
        "secondary-dark": "#0891B2",
        accent: "#8B5CF6",
        "accent-pink": "#EC4899",
        "section-primary": "#F8FAFC",
        "section-secondary": "#ECFEFF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #12C48B 0%, #08B6D8 100%)",
        "gradient-hero": "linear-gradient(135deg, #F0FDF4 0%, #ECFEFF 50%, #F0F9FF 100%)",
        "gradient-dark": "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
      },
    },
  },
  plugins: [],
}
