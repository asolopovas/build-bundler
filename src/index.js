require('dotenv').config()
global.Path = require('./Path')
global.dev = require('./Api')
global.argv = require('yargs').argv


// include dev.config.js
require(Path.conf())


module.exports = dev
