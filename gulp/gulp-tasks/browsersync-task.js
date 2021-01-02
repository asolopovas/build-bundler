const argv = require('yargs').argv
const path = require('path')
const {watch, series} = require('gulp')
const webpack = require('webpack')
const bundler = webpack(webpackConfig)
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const sassTasks = require('./sass-tasks')

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

module.exports = () => {

    browserSync.init(bs.config())

    watch(bs.watchPaths, sassTasks(true))
}
