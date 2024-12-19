/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    './*.html',
    './pages/**/*.{html,js}',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'pc': '1375px',
      },
      spacing: {
        '18': "4.5rem"
      },
      fontFamily: {
        'quicksand': ['Quicksand'],
      },
      fontSize: {
        'huge': ['5.25rem', '1']
      },
      boxShadow: {
        'sh-1': '2px 6px 50px 0px rgba(252, 252, 252, 0.16)',
      },
      backgroundImage: {
        'gr-1': 'linear-gradient(22deg, rgba(164, 168, 255, 0.80) -85.73%, rgba(240, 235, 232, 0.80) 69.8%)',
      },
      maxWidth: {
        'half': '50%'
      },
      maxHeight: {},
      lineHeight: {
        '0': '0.5',
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: {
          'default': '#000000',
          '1': '#0C0C0C',
        },
      },
    },
  },
  plugins: [],
}

