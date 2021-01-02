global.browserSync = require('browser-sync').create()
global.webpackConfig = require('./webpack.config')
require('./gulp/gulp-helpers')
// const Sass = require('./gulp/gulp-tasks/sass-standalone')
const Clean = require('./gulp/gulp-tasks/clean-task')
const BrowserSync = require('./gulp/gulp-tasks/browsersync-task')
const Webpack = require('./gulp/gulp-tasks/webpack-task')
const ServiceWorker = require('./gulp/gulp-tasks/service-worker-task')
const sassTasks = require('./gulp/gulp-tasks/sass-tasks')
const CriticalCss = require('./gulp/gulp-tasks/sass-critical-task')

module.exports = {
    Sass: sassTasks(),
    CriticalCss,
    Clean,
    BrowserSync,
    Webpack,
    ServiceWorker,
}
