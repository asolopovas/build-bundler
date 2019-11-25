const JsonStore = require('../../src/JsonStore')

class ProductionLogic {
  apply(compiler) {
    compiler.hooks.done.tap('Add compiled files to assets.json', stats => {
      const manifest = new JsonStore('dev-manifest.json')
      const jsonStats = stats.toJson()
      for (let asset of Object.keys(jsonStats.assetsByChunkName)) {
        manifest.put(`${asset}.js`, `${asset}.${stats.hash}.js`)
      }
    })
  }
}

module.exports = ProductionLogic
