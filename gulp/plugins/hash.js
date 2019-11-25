const through = require('through2')
const path = require('path')
const revHash = require('rev-hash')
const JsonStore = require('../../src/JsonStore')

function renameFile(file) {
  let newName = file.relative.split('.')
  newName.splice(1,0, revHash(file.contents))
  return newName.join('.')
}

module.exports = function() {
  return through({objectMode: true}, (file, encoding, callback) => {
    const manifest = new JsonStore('dev-manifest.json')
    const newName = renameFile(file)
    manifest.put(file.relative, newName)
    file.path = path.join(file.base, newName)
    // Rename sourcemap if present
    if (file.sourceMap) {
      file.sourceMap.file = file.relative;
    }
    callback(null, file)
  })
}
