const rm = require('rimraf')

module.exports = function clean(paths) {
  if (Array.isArray(paths)) {
    for (let path of paths) {
      rm(path, function(error) {
        if (error) throw error
      })
    }
    return
  }
  rm(paths, function(error) {
    if (error) throw error
  })
  return
}
