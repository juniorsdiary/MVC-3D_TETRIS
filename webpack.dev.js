const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const findHtmlFiles = require('./findHtmlFiles.js');

module.exports = merge(common, {
    mode: 'development',
    output: {
      path: path.join(__dirname, '/build'),
      filename: '[name].js'
    },
    devServer: {
      overlay: true,
      contentBase: './src/views/index.pug',
      watchContentBase: true
    },
    devtool: 'eval-sourcemap',
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [].concat(findHtmlFiles)
})
