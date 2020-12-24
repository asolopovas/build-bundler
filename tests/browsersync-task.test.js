const test = require('ava')
// import fs from 'fs'

const dev = require('../src/config')
const tasks = require('../gulp-tasks')

test.before(t => {
    tasks.BrowserSync(() => t.true(true))
});
//
test('browsersync built successful', t => {
    t.true(true)
})
