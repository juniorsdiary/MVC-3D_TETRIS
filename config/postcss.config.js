const paths = require('./paths');

module.exports = {
  plugins: [
    require('css-mqpacker')({
      sort: true,
    }),
    require('stylelint')({
      configFile: `${paths.appConfig}/stylelint.config.js`,
      context: paths.appSrc,
      files: '**/*.css',
      failOnError: false,
      quiet: false,
    }),
    require('autoprefixer'),
  ],
};
