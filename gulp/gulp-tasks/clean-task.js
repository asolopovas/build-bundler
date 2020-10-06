const rm = require('rimraf')

module.exports = function clean(paths) {
  let result = ''
  if (Array.isArray(paths)) {
    for (let path of paths) {
      rm.sync(path, [])
    }
    return Promise.resolve(result)
  }
  rm.sync(paths, [])
  return Promise.resolve(result)
}
