require('dotenv').config()
global.Path = require('./Path')
global.dev = require('./Api')

// include dev.config.js
require(Path.conf())


module.exports = dev
