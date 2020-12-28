const config = require('../webpack.config')

test('output.publicPath is correct', t => {
    t.is(config.output.publicPath, '/')
})

test('output.resolve.modules are merging', t => {
    t.deepEqual(config.resolve.extensions, ['.js', '.jsx', '.json', '.tsx', '.ts', '.vue', '.svg', '.css'])
})

