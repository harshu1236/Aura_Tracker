// craco.config.js
const tailwindcssPostcss = require('@tailwindcss/postcss');

module.exports = {
  style: {
    postcss: {
      plugins: [
        tailwindcssPostcss(),
        require('autoprefixer'),
      ],
    },
  },
};
