/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00B207',
        'primary-light': '#EDF2EE',
        'primary-extra-light': '#F2FBF2',
        'text-dark': '#1A1A1A',
        'text-light': '#4D4D4D',
        'text-muted': '#808080',
        'text-nav': '#999999',
        'text-dark-gray': '#666666',
        'background-dark': '#1A1A1A',
        'background-darker': '#333333',
        'border-color': '#E6E6E6',
        'warning': '#FF8A00',
        'sale': '#EA4B48',
        'white': '#FFFFFF',
        'black': '#000000',
        'gray': {
          100: '#F2F2F2',
          200: '#E6E6E6',
          300: '#CCCCCC',
          400: '#B3B3B3',
          500: '#999999',
          600: '#808080',
          700: '#666666',
          800: '#4D4D4D',
          900: '#1A1A1A',
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'feature': '0px 8px 40px 0px rgba(0, 38, 3, 0.08)',
        'product-hover': '0px 0px 12px 0px rgba(32, 181, 38, 0.32)',
        'testimonial': '0px 8px 40px 0px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        slideInTop: {
          '0%': {
            transform: 'translateY(-50px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        'slideInTop': 'slideInTop 0.3s both',
      },
    },
  },
  plugins: [],
}
