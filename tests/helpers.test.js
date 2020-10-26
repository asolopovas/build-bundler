const test = require('ava')
const path = require('path')
const {publicPath, absolutePath} = require('../src/helpers')

let rootPath = 'home/site.test/wp-content/themes/test_theme/'

test('returns correct public path', t => {
    t.is(publicPath('static/src/index.js', rootPath), '/wp-content/themes/test_theme/static/src/index.js')
    t.is(publicPath('static/src', rootPath), '/wp-content/themes/test_theme/static/src')
    t.is(publicPath('static/src/', rootPath), '/wp-content/themes/test_theme/static/src')
})

test('return correct absolute path', t => {
    const paths = ['static/src/index1.js', 'static/src/index2.js']

    t.is(absolutePath('static/src/index.js', rootPath), path.resolve(rootPath, 'static/src/index.js'))
    t.deepEqual(
        absolutePath(paths, rootPath), paths.map(_path => path.resolve(rootPath, _path)),
    )
})

