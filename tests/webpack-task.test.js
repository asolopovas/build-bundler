const test = require('ava')
const fs = require('fs')
const dev = require('../src/config')
const tasks = require('../gulp-tasks')

test.before(async t => {
    await tasks.Webpack.build()
});

test('webpack built successful', async t => {
    const destFile = `${dev.js.dest}/app.js`
    t.true(fs.existsSync(destFile))
    tasks.Clean(destFile)
})




