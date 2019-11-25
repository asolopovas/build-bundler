const fs = require('fs')
const path = require('path')
const File = require('./File')

function file(path) {
  return new File(path)
}

function absolutePath(paths, root = process.cwd()) {
  return Array.isArray(paths)
    ? paths.map(_path => path.resolve(root, _path))
    : path.resolve(root, paths)
}

function publicPath(_path, root = process.cwd()) {
  const absolutePath = _path.substr(-1) === '/'
    ? path.resolve(root, _path).replace(/$\//g, '')
    : path.resolve(root, _path)
  if (root.includes('wp-content') || fs.existsSync(`${root}/wp-content`)) {
    return absolutePath
      .replace(/^.*(?=\\wp-content|\/wp-content)/g, '')
      .replace(/\\/g, '/')
  }
  return ''
}

function joinPath(...paths) {
  return path.join(...paths).replace(/\\/g, '/')
}

module.exports = {
  absolutePath,
  publicPath,
  file,
  joinPath,
}

