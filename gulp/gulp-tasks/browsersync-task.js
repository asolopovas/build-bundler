// ---------------------------------------------------
// WebPack
// ---------------------------------------------------
const argv = require('yargs').argv
const path = require('path')
const {watch, dest} = require('gulp')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const Sass = require('./sass-standalone')
const fs = require('fs')
const vfs = require('vinyl-fs');

function bs(cb) {
    const webpack = require('webpack')
    const bundler = webpack(webpackConfig)
    let middleware = [
        webpackDevMiddleware(bundler, {
            publicPath: webpackConfig.output.publicPath,
        }),
    ]

    if (argv.hot) {
        middleware.push(webpackHotMiddleware(bundler))
    }

    const config = {
        ...dev.bs,
        middleware,
    }

    browserSync.init(config)

    function streamSass(cb) {
        dev.sassTasks.forEach(task => {
            const sass = new Sass(task.src, task.dest, task.opts)
            sass.write().then(() => {
                const stream = vfs.dest(sass.dest.segments.absolutePath, {sourcemaps: true})
                stream.pipe(browserSync.stream())
            })
        })
        cb()
    }

    if (Array.isArray(dev.sass.src)) {
        const watchPaths = dev.sass.src.map(item => {
            let itemPath = path.dirname(item).replace(/\\/g, '/')
            return `${itemPath}/**/*.scss`
        })
        watchPaths.push(`${process.cwd()}/tailwind.config.js`)
        watch(watchPaths, streamSass)
    } else {
        let watchPath = path.dirname(dev.sass.src)
        watch([`${watchPath}/**/*.scss`, `${process.cwd()}/tailwind.config.js`], streamSass)
    }
    cb()
}

module.exports = bs
