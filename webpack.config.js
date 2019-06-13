const chunks = require('./entries.js');

module.exports = {
  entry: chunks,
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "imgs"
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: '70',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.otf$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/"
          }
        }
      }
    ]
  }
}
