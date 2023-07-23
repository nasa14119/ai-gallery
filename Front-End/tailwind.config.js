/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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

