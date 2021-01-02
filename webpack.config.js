require('./src/index.js').setup()
const argv = require('yargs').argv
const {merge} = require('webpack-merge')
const rules = require('./webpack/webpack-rules')
const plugins = require('./webpack/webpack-plugins')
const {absolutePath, publicPath, file} = require('./src/helpers')

// Api initialize
class WebpackConfig {
    constructor() {
        this.config = {}
    }

    build() {
        this.config = merge(require('./webpack/webpack.default')(), dev.js.opts)
        this.buildEntry()
        this.buildOutput()
        this.setPlugins(plugins)
        this.setRules(rules)
        return this.config
    }

    setEntry(path) {
        let entry = file(path)
        this.config.entry[entry.nameWithoutExtension()] = this.buildEntryValue(entry.relativePath())
    }

    setRules(rules) {
        this.config.module.rules = rules
    }

    setPlugins(plugins) {
        this.config.plugins = plugins
    }

    buildOutput() {
        this.config.output.path = absolutePath(dev.js.dest)
        this.config.output.publicPath = `${publicPath(dev.js.dest)}/`
    }

    buildEntry() {
        if (typeof dev.js.src === 'string') {
            this.setEntry(dev.js.src)
        }
        if (Array.isArray(dev.js.src)) {
            for (let entry of dev.js.src) {
                this.setEntry(entry)
            }
        }
    }

    buildEntryValue(path) {
        let output = []

        if (argv.hot) {
            output.push(
                'webpack/hot/dev-server',
                'webpack-hot-middleware/client?reload=true&noInfo=true',
            )
        }

        output.push(path)

        return output

    }

}

module.exports = (new WebpackConfig()).build()
