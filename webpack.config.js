const argv = require('yargs').argv
const merge = require('webpack-merge')
const dev = require('./src/config')
const defaultConfig = require('./webpack/webpack.default')
const rules = require('./webpack/webpack-rules')
const plugins = require('./webpack/webpack-plugins')
const {absolutePath, publicPath, file} = require('./src/helpers')

// Api initialize
class WebpackConfig {
  constructor() {
    this.config = merge(defaultConfig(), dev.js.opts)
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
    this.config.output.publicPath = publicPath(dev.js.dest)
  }

  buildEntry() {
    if (typeof dev.js.src === 'string') {
      this.setEntry(dev.js.src)
    } else {
      for (let entry of dev.js.src) {
        this.setEntry(entry)
      }
    }
  }

  buildEntryValue(path) {
    let output = []

    if (argv.hot) {
      output.push(
        'webpack-hot-middleware/client?reload=true&noInfo=true',
        'webpack/hot/dev-server',
      )
    }

    output.push(path)

    return output

  }

  build() {
    this.buildEntry()
    this.buildOutput()
    this.setPlugins(plugins)
    this.setRules(rules)
    return this.config
  }
}

const config = (new WebpackConfig()).build()

module.exports = config
