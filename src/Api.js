const factory = require('./ComponentsFactory')

class Api {

    constructor() {
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
