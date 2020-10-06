let argv = require('yargs').argv
let path = require('path')

class Path {
  /**
   * Create a new Paths instance.
   */
  constructor() {
    if (argv['$0'].includes('ava')) {
      this.rootPath = path.resolve(__dirname, '../')
    } else {
      this.rootPath = process.cwd()
    }
  }

  /**
   * Determine the path to the user's dev.config.js file.
   */
  conf() {
    return this.root(
      argv.env && argv.env.conf ? argv.env.conf : 'dev.config',
    )
  }

  /**
   * Determine the project root.
   *
   * @param {string|null} append
   */
  root(append = '') {
    return path.resolve(this.rootPath, append)
  }

}

module.exports = new Path
