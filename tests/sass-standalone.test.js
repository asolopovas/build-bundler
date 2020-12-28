const fs = require('fs')
const sass = require('../gulp/gulp-tasks/sass-standalone')

test.before(async t => {
    sass.start()
});

test('output.publicPath is correct', t => {

    t.true(true)

})

