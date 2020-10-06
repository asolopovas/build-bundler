const {parallel} = require('gulp')
const tasks = require('./gulp-tasks')
const nodemon = require('gulp-nodemon')

function CleanExistingAssets(done) {
  tasks.Clean([dev.sass.dest, dev.js.dest])
  done()
}

function server(done) {
  nodemon({
    script: './src/server/server',
    ext: 'js html',
    env: {'NODE_ENV': 'development'},
    done: done,
  })
}

exports.clean = CleanExistingAssets
exports.sass = tasks.Sass
exports.server = parallel(server, tasks.BrowserSync)

exports.browserSync = tasks.BrowserSync
exports.webpack = tasks.Webpack
exports.serviceWorker = tasks.ServiceWorker
