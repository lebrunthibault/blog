/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./layouts/**/*.html", "./content/**/*.{html,md}"],
  theme: {
    extend: {
      colors: {
        'rich-black': '#0D1B2A',
        'oxford-blue': '#1B263B',
        'yinmn-blue': '#415A77',
        'shadow-blue': '#778DA9',
        'platinum': '#E0E1DD',
        primary: '#415A77',
        secondary: '#778DA9',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Montserrat', 'sans-serif'],
        mono: ['Montserrat', 'monospace']
      },
      maxWidth: {
        'content': '800px'
      },
      spacing: {
        '1': '8px',
        '2': '12px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
      }
    }
  },
  plugins: []
};