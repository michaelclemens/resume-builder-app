import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
        'max-height': 'max-height',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        lato: ['var(--font-lato)'],
        oswald: ['var(--font-oswald)'],
        roboto: ['var(--font-roboto)'],
        alexandria: ['var(--font-alexandria)'],
      },
      typography: {
        DEFAULT: {
          css: {
            ul: {
              '> li > p': {
                marginTop: '0.3rem',
                marginBottom: '0.3rem',
              },
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar'), require('@tailwindcss/typography')],
}
export default config
