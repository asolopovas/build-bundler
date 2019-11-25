class PostCss {
  constructor() {
    this.props = ['postcss']
    this.src = ''
    this.dest = ''
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

module.exports = new PostCss
