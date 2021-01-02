const tasks = require('./gulp-tasks')
const nodemon = require('gulp-nodemon')

function server(done) {
    nodemon({
        script: './src/server/server',
        ext: 'js html',
        env: {'NODE_ENV': 'development'},
        done: done,
    })
}

exports.clean = async(done) => {
    try {
        await tasks.Clean([`${dev.sass.dest}/**`, `${dev.js.dest}/**`], true)
        done()
    } catch (error) {
        console.log(error)
    }
}

exports.sass = tasks.Sass
exports.server = server
exports.browserSync = tasks.BrowserSync
exports.webpack = tasks.Webpack.build
exports.serviceWorker = tasks.ServiceWorker
