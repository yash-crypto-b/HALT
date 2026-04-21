import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'halt-red': '#e63946',
        'halt-dark': '#0a0a0a',
        'halt-card': '#1a1a1a',
        'halt-border': '#2a2a2a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        none: 'none',
      },
      backgroundImage: {
        'halt-noise':
          'radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 45%), linear-gradient(135deg, rgba(230,57,70,0.08), transparent 40%)',
      },
    },
  },
  plugins: [forms],
}
