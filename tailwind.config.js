/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#070b18',
        panel: '#0d1324',
        line: '#25304f',
        ink: '#eef2ff',
        mist: '#95a1ca',
        violet: '#8866ff',
        cobalt: '#37a8ff',
        ice: '#7de2ff'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(141, 167, 255, 0.15), 0 30px 80px rgba(32, 68, 191, 0.28)',
        soft: '0 24px 64px rgba(5, 10, 24, 0.45)'
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(144, 165, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(144, 165, 255, 0.08) 1px, transparent 1px)'
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        sans: ['"Space Grotesk"', 'sans-serif']
      }
    }
  },
  plugins: []
};
