/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./Front-End/index.html",
    "./Front-End/src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily:{
      body: ["var(--font-p)", "Open Sans"]
    }, 
    extend: {

    },
  },
  plugins: [],
}