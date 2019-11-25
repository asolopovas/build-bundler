class Workbox {

  constructor() {
    this.props = ['workbox', 'sw']
    this.opts = ''
  }

  set(opts, parent) {
    this.opts = opts
    return parent
  }

  get() {
    return this.opts
  }

}

module.exports = new Workbox()
