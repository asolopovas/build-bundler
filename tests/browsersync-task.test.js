import regeneratorRuntime from "regenerator-runtime";
import test from 'ava'
// import fs from 'fs'

// const dev = require('../src/config')
//
const tasks = require('../gulp-tasks')

test.before(async t => {
  await tasks.BrowserSync(() => t.true(true))
});

test('browsersync built successful', async t => {
  t.true(true)
})


