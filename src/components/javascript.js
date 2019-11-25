let {absolutePath} = require('../helpers')

class Javascript {

  constructor() {
    this.props = ['js', 'javascript']
    this.src = ''
    this.dest = ''
    this.opts = ''
  }

  set(src, dest, opts, parent) {
    this.src = src
    this.dest = dest
    this.opts = opts
    return parent
  }

  get() {
    return {
      src: this.src,
      dest: this.dest,
      opts: this.opts,
    }
  }
}

module.exports = new Javascript()
