// ---------------------------------------------------
// WebPack
// ---------------------------------------------------
const argv = require('yargs').argv
const path = require('path')
const {src, task, watch, series, parallel,dest} = require('gulp')
const webpack = require('webpack')
const bundler = webpack(webpackConfig)
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const Sass = require('./sass')

class BS {
    constructor() {
        this.watchPaths = [`${process.cwd()}/tailwind.config.js`]
        this.setupWatchPaths()
    }

    config() {
        let middleware = [
            webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath,
            }),
        ]

        if (argv.hot) {
            middleware.push(webpackHotMiddleware(bundler))
        }
        return {
            ...dev.bs,
            middleware,
        }
    }

    tasks(stream = false) {
        const tasks = []
        for (const conf of dev.sassConfigs) {
            const sassTask = new Sass(conf.src.segments.absolutePath, conf.dest.segments.absolutePath, conf.opts)
            const task = () => stream ? sassTask.stream().setup() : sassTask.setup()
            Object.defineProperty(task, 'name', {value: `compiling ${conf.src.name()}`})
            tasks.push(task)
        }
        return tasks
    }

    setupWatchPaths() {
        for (const conf of dev.sassConfigs) {
            let watchPath = path.dirname(conf.src.segments.absolutePath)
            if (!this.watchPaths.includes(`${watchPath}/**/*.scss`)) {
                this.watchPaths.push(`${watchPath}/**/*.scss`)
            }
        }
    }

}

const bs = new BS()
// const sassTasks = series(...bs.tasks())
// const sassStreamTasks = series(...bs.tasks(true))
const config = bs.config()

const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('sass');
const sourcemaps = require('gulp-sourcemaps');

function sassTask() {
    const conf = dev.sassConfigs[0]
    console.log(conf.dest.segments.absolutePath)
    const sassClass = new Sass(conf.src.segments.absolutePath, conf.dest.segments.absolutePath, conf.opts)
    const sassBS = src(conf.src.segments.absolutePath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(conf.dest.segments.absolutePath))
        .pipe(browserSync.stream())
    return sassClass.setup()
}

module.exports = cb => {
    browserSync.init(config)
    sassTask()
    watch(bs.watchPaths, sassTask)
    cb()
}
