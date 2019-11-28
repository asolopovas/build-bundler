const argv = require('yargs').argv
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProductionLogic = require('./plugins/production-logic')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const dev = require('../src/config')

const plugins = [
  new Dotenv(),
  new VueLoaderPlugin(),
]

if ( dev.js.opts.hasOwnProperty('plugins') ) {
   plugins.push(...dev.js.opts.plugins)
}

if (argv.extract) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: `${dev.sass.dest}/[name].css`,
      chunkFilename: '[id].css',
    }),
  )
}

if (argv.production) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      },
    ),
    new ProductionLogic(),
  )
}

if (argv.hot) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = plugins
