const fs = require('fs')
const Path = require('./Path')

class JsonStore {

  constructor(name) {
    this.path = `${Path.root()}/${name}`
    this.make()
    this.parse()
  }

  make() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify({}), err => {
        if (err) throw err
      })
    }
  }

  parse() {
    this.obj = JSON.parse(fs.readFileSync(this.path))
  }

  write() {
    fs.writeFileSync(this.path, JSON.stringify(this.obj))
  }

  put(key, value) {
    this.obj[key] = value
    this.write()
  }

  rm(key) {
    delete this.obj[key]
    this.write()
  }

  get(key) {
    return !this.obj.hasOwnProperty(key) ? false : this.obj[key]
  }

}

module.exports = JsonStore
