module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:jsx-a11y/recommended'],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  plugins: ['jsx-a11y', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack-common-config.js',
      },
    },
  },
};
