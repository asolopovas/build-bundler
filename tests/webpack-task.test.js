const {Webpack, Clean} = require('../gulp-tasks')

test.before(async () => {
    await Webpack.build()
});


test('webpack built successful', async t => {
    const destFile = `${dev.js.dest}/app.js`
    t.true(fs.existsSync(destFile))
    Clean(destFile)
})


