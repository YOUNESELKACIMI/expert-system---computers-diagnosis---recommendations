/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./public/**/*.html",
  "./src/**/*.jsx",
  "./src/**/*.js",],
  theme: {
    extend: {
      backgroundColor: {
        'gradient': 'linear-gradient(to right, #4F46E5, #D43F8D)',
      },
    },
  },
  plugins: [],
}

