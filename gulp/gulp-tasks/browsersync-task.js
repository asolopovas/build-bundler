// ---------------------------------------------------
// WebPack
// ---------------------------------------------------
const argv = require('yargs').argv
const path = require('path')
const {watch} = require('gulp')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const Sass = require('./sass-task.js')

function bs(cb) {
  let middleware = []

  if (argv.hot) {
    const webpack = require('webpack')
    const bundler = webpack(webpackConfig)
    middleware = [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {colors: true, chunks: false, modules: false},
      }),
      webpackHotMiddleware(bundler),
    ]
  }

  const config = {
    ...dev.bs,
    middleware,
  }

  browserSync.init(config)

  function streamSass() {
    return (new Sass()).setStream().setup().src
  }

  let watchPath = path.dirname(dev.sass.src)
                      .replace(/\\/g, '/')
  watch([`${watchPath}/**/*.scss`], streamSass)
  cb()
}

module.exports = bs
