'use strict'

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const SRC_DIR = path.resolve(__dirname, 'src')
const DIST_DIR = path.resolve(__dirname, 'dist')
const NODE_DIR = path.resolve(__dirname, 'node_modules')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV,
  entry: `${SRC_DIR}/main.ts`,
  devtool: isDev ? 'source-map' : 'nosources-source-map',
  output: {
    path: DIST_DIR,
    publicPath: DIST_DIR,
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts'],
    modules: [SRC_DIR, NODE_DIR],
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader',
            // options: {
            //   fix: true,
            //   cache: !isDev,
            // },
          },
        ],
        exclude: [
          /node_modules/,
          /\.spec\.ts/,
        ],
      },
    ],
  },
}
if (!isDev) {
  config.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
    })],
  }
}

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('devtool', config.devtool)

module.exports = config
