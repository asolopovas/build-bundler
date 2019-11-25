const path = require('path')
Array.prototype.resolve = function() {
  return this.map(process.cwd(), item => path.resolve(item))
}
 
global.resolve = function(dir) {
  return path.resolve(process.cwd(), dir)
}
