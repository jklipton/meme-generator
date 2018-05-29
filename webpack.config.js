/*eslint-env node*/

const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(`${path}/bundle.*.js`),
        new HtmlWebpackPlugin()
    ],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader'
              }
            ]
          }
        ]
      }
    };