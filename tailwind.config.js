/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // İşte butonunun aradığı "academic" renk paleti:
          academic: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7', // Button'un ana rengi (Primary)
            700: '#0369a1',
            800: '#075985', // Hover rengi
            900: '#0c4a6e',
            950: '#082f49',
          }
        }
      },
    },
    plugins: [],
  }