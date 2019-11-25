import test from 'ava'
import mockFs from 'mock-fs'
import {publicPath, absolutePath} from '../src/helpers'

let rootPath = '/home/site.test/wp-content/themes/test_theme/'
test.beforeEach(t => {
  mockFs({
    '/home/site.test/wp-content/themes/test_theme/static/src/': {
      'index.js': 'console.log("test")',
    },
  })
});

test.after(t => {
  mockFs.restore()
})

test('returns correct public path', t => {

  t.is(publicPath('static/src/index.js', rootPath), '/wp-content/themes/test_theme/static/src/index.js')
  t.is(publicPath('static/src', rootPath), '/wp-content/themes/test_theme/static/src/')

  mockFs.restore()
})

test('return correct absolute path', t => {
  const path = absolutePath('static/src/index.js', rootPath)
    .replace(/\\/g, '/').replace(/C:/g, '')
  t.is(path, `${rootPath}static/src/index.js`)
})
