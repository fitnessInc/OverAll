/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./App.{js,jsx}",
     "./src/screens/**/*.{js,jsx}",
     "./src/config/**/*.{js,jsx}",
     "./src/screens/trainersPro/**/*.{js,jsx}"

  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
}

