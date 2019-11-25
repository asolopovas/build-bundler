const factory = require('./ComponentsFactory')

class Api {

  constructor() {
    this.register()
  }

  register() {
    for (let component of factory.components) {
      component.props.forEach(prop => {
        this[prop] = (...args) => component.set(...args, this)
      })
    }
  }

  setup() {
    for (let component of factory.components) {
      component.props.forEach(prop => {
        this[prop] = component.get()
      })
    }
    return this
  }

}

module.exports = Api
