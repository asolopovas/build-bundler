global.browserSync = require('browser-sync').create()
global.dev = require('./src/config')
global.webpackConfig = require('./webpack.config')
require('./gulp/gulp-helpers')
const Sass = require('./gulp/gulp-tasks/sass-task')
const Clean = require('./gulp/gulp-tasks/clean-task')
const BrowserSync = require('./gulp/gulp-tasks/browsersync-task')
const Webpack = require('./gulp/gulp-tasks/webpack-task')
const ServiceWorker = require('./gulp/gulp-tasks/service-worker-task')

module.exports = {
  Sass: () => (new Sass).setup().src,
  SassCritical: () => (new Sass).setCritical().setup().src,
  SassRest: () => (new Sass).setCritical('rest').setup().src,
  Clean,
  BrowserSync,
  Webpack,
  ServiceWorker,
}
