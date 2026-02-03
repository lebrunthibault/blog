/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./layouts/**/*.html", "./content/**/*.{html,md}"],
  theme: {
    extend: {
      colors: {
        'rich-black': '#0c0c0c',
        'oxford-blue': '#161616',
        'yinmn-blue': '#415A77',
        'shadow-blue': '#778DA9',
        'platinum': '#d4d4d4',
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