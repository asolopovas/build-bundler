let {absolutePath} = require('../helpers')

class Sass {
  constructor() {
    this.props = ['sass']
    this.src = ''
    this.dest = ''
    this.opts = ''
  }

  set(src, dest, opts = {includePaths: []}, parent) {
    this.src = src
    this.dest = dest
    if ( opts.hasOwnProperty('includePaths') ) {
      this.opts = opts
      this.opts.includePaths = this.opts.includePaths.map(path => {
        if (path) {
          return absolutePath(path)
        }
      })
    }

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

module.exports = new Sass
