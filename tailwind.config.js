/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        baseolor: "#544E44"
      },
      fontFamily: {
        sans: ['Anuphan', 'sans-serif'],
        sukhumvit: ['Sukhumvit Set', 'sans-serif'],
      },
      animation: {
        'word-slide': 'slideUp 6s infinite',
        'word-slide-next': 'slideDown 6s infinite',
        'scroll': 'scroll 30s linear infinite'
      },
      keyframes: {
        slideUp: {
          '0%, 45%': { transform: 'translateY(0)', opacity: '1' },
          '50%, 95%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%, 45%': { transform: 'translateY(100%)', opacity: '0' },
          '50%, 95%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }  // แค่ -50% เพราะเราใช้แค่ 2 ชุด
        }
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.animation-play-state-paused': {
          'animation-play-state': 'paused',
        }
      })
    }
  ]
}