const fs = require('fs')
const path = require('path')
const File = require('./File')

function file(path) {
  return new File(path)
}

function absolutePath(paths, root = process.cwd()) {
  if (Array.isArray(paths)) {
    return paths.map(path => {
      path.resolve(root, path)
    })
  }

  return path.resolve(root, paths)
}

function publicPath(_path, root = process.cwd()) {
  const absolutePath = path.join(root, _path)
  if (root.includes('wp-content') || fs.existsSync(`${root}/wp-content`)) {
    return fs.lstatSync(absolutePath).isDirectory()
      ? absolutePath
        .replace(/^.*(?=\\wp-content|\/wp-content)/g, '')
        .replace(/\\/g, '/')
        .replace(/$/g, '/')
      : absolutePath
        .replace(/^.*(?=\\wp-content|\/wp-content)/g, '')
        .replace(/\\/g, '/')
  }
  return '/'
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

