const defaultTheme = require('tailwindcss/defaultTheme')

/**
 * @type {import('tailwindcss').Config}
 **/
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    },
    container: {
      center: true
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries')
  ]
}
