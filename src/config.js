const Path = require('./Path')
const dev = require('../src/index')
require(Path.conf())

module.exports = dev.setup()
