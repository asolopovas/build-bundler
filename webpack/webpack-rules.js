const argv = require('yargs').argv
const {publicPath, joinPath} = require('../src/helpers')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pPath = publicPath(dev.js.dest)

let rules = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|vendor)/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          [
            '@babel/preset-env', {modules: false},
          ],
        ],
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|vendor)/,
    use: {
      loader: 'ts-loader',
    },
  },
  {
    test: /\.vue$/,
    use: {
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: 'vue-style-loader!css-loader!sass-loader',
        },
      },
    },
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: joinPath(pPath, 'img/[name].[hash:7].[ext]'),
      },
    },
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: joinPath(pPath, 'media/[name].[hash:7].[ext]'),
      },
    },
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: joinPath(pPath, 'fonts/[name].[hash:7].[ext]'),
      },
    },
  },
]

let sassPlugins = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      sassOptions: {
        includePaths: dev.sass.opts.includePaths,
      },
    },
  },
]
if (argv.extract) {
  sassPlugins.unshift(MiniCssExtractPlugin.loader)
} else {
  sassPlugins.unshift({
    loader: 'style-loader'
  })
}

let sass = {
  test: /\.(sa|sc|c)ss$/,
  use: sassPlugins,
}

rules.push(sass)

module.exports = rules
