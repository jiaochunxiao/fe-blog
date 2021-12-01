'use strict';
const path = require('path');
const webapck = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
  },
  devServer: {
    inline: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    host: 'localhost',
    port: '8081',
    compress: true,
  },
  plugins: [
    new webapck.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    })
  ]
};