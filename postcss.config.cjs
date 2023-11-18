/* eslint-env node */
module.exports = {
  plugins: [
    require('postcss-each')({
      plugins: {
        beforeEach: [require('postcss-for'), require('postcss-color-mix')]
      }
    }),
    require('tailwindcss/nesting'),
    require('autoprefixer'),
    require('tailwindcss')
  ]
}
