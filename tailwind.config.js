/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textMain: '#464255',
        textLight: '#A3A3A3',
        bgGrey: '#F3F2F7',
        success: '#00B074',
        success20percent: '#00B07426',
        blueCyan: '#2D9CDB26',
        grey: '#D0D6DE'
      },
    },
  },
  plugins: [
    
  ],
}