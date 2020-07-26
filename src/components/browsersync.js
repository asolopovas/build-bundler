const Path = require('../Path')
const {merge} = require('webpack-merge')

class BrowserSync {

  constructor() {
    this.props = ['browsersync', 'bs']
    this.opts = ''
  }

  default() {
    return require(`${Path.root()}/node_modules/browser-sync/dist/default-config.js`)
  }

  set(opts, parent) {
    this.opts = merge(this.default(), opts)
    return parent
  }

  get() {
    return this.opts
  }

}

module.exports = new BrowserSync()
