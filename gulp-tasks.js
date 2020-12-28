global.browserSync = require('browser-sync').create()
global.webpackConfig = require('./webpack.config')
require('./gulp/gulp-helpers')
const Sass = require('./gulp/gulp-tasks/sass-standalone')
const Clean = require('./gulp/gulp-tasks/clean-task')
const BrowserSync = require('./gulp/gulp-tasks/browsersync-task')
const Webpack = require('./gulp/gulp-tasks/webpack-task')
const ServiceWorker = require('./gulp/gulp-tasks/service-worker-task')
module.exports = {
    Sass: () => {
        dev.sassTasks.forEach(task => {
            const sass = new Sass(task.src, task.dest, task.opts)
            sass.write().then(() => {
                console.log('Sass compiled')
            })
        })
    },
    Clean,
    BrowserSync,
    Webpack,
    ServiceWorker,
}
