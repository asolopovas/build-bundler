const tasks = require('./gulp-tasks')

function CleanExistingAssets(done) {
  tasks.Clean([dev.sass.dest, dev.js.dest])
  done()
}

exports.clean = CleanExistingAssets
exports.sass = tasks.Sass
exports.sassRest = tasks.SassRest
exports.sassCritical = tasks.SassCritical
exports.browserSync = tasks.BrowserSync
exports.webpack = tasks.Webpack
exports.serviceWorker = tasks.ServiceWorker
