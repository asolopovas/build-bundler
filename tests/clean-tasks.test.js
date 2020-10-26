const test = require('ava')
const path = require('path')
const fs = require('fs')

const tasks = require('../gulp-tasks')

let testPath = path.resolve('dummy-site/temp/')
const filePath = `${testPath}/test-file`

test('test file created', t => {
    fs.closeSync(fs.openSync(filePath, 'a'))
    t.true(fs.existsSync(filePath))
})

test('clean function works correctly', t => {
    tasks.Clean(filePath)
    t.false(fs.existsSync(filePath))
})

