import aspectRatio from '@tailwindcss/aspect-ratio'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Montserrat', 'sans-serif']
      },
      scale: {
        '-100': '-1'
      },
      colors: {
        primary: {
          DEFAULT: colors.gray[500],
          ...colors.gray
        },
        accent: {
          DEFAULT: colors.teal[500],
          ...colors.teal
        },
      }
    }
  },
  corePlugins: {
    aspectRatio: false
  },
  plugins: [aspectRatio]
}
