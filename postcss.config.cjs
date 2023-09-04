/* eslint-env node */
module.exports = {
  plugins: [
    require('postcss-each'),
    require('tailwindcss/nesting'),
    require('autoprefixer'),
    require('tailwindcss')
  ]
}
