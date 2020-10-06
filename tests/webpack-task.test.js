import test from 'ava'
import fs from 'fs'

const dev = require('../src/config')

const tasks = require('../gulp-tasks')

test.before(async t => {
  await tasks.Webpack()
});

test('webpack built successful', async t => {
  const destFile = `${dev.js.dest}/app.js`
  t.true(fs.existsSync(destFile))
  tasks.Clean(destFile)
})




