const paths = require('./paths');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: paths.appPublic,
    filename: 'bundle.js',
  },
  devServer: {
    port: 1302,
    clientLogLevel: 'silent',
    compress: true,
    overlay: true,
    hot: true,
    watchContentBase: true,
    contentBase: paths.appAssets,
    historyApiFallback: true,
    noInfo: true,
    open: true,
  },
  devtool: 'eval-sourcemap',
  resolve: {
    extensions: ['.ts', 'tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `${paths.appConfig}/postcss.config.js`,
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.ts|\.tsx$/,
        enforce: 'pre',
        use: ['babel-loader', 'awesome-typescript-loader'],
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/index.html',
        to: './index.html'
      },
    ]),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      favicon: `${paths.appSrc}/favicon.ico`,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css',
      allChunks: true
    }),
    new ForkTsCheckerWebpackPlugin({ async: true }),
    new CheckerPlugin(),
  ],
});
