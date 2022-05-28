const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color:theme('colors.gray.700'),
            h3: {
              fontWeight: {
                bold:700
              }
            }
          }
        }
      })
    },
  },
  plugins: [
  require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
  require("daisyui")]
}
