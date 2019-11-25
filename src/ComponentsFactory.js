let glob = require('glob')

class ComponentsFactory {
  constructor() {
    this.components = []
    this.install()
  }

  install() {
    glob.sync(`${__dirname}/components/**/*.js`).forEach(file => {
      this.components.push(require(file))
    });
  }

}

module.exports = new ComponentsFactory()

