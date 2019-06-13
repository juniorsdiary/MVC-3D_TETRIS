const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const autoprefixer = require('autoprefixer');
const findHtmlFiles = require('./findHtmlFiles.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'js/[name].js'
  },
  optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin(),
        new TerserPlugin()
      ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssPlugin({filename: "[name].css"})
  ].concat(findHtmlFiles),
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssPlugin.loader,
          "css-loader",
          'group-css-media-queries-loader',
          {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer({
                        browsers:['ie >= 8', 'last 4 version']
                    })
                ],
                sourceMap: true
            }
          },
          "sass-loader",
        ]
      },
    ]
  }
})
