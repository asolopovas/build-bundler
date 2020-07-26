import test from 'ava'
import config from '../webpack.config'

test('output.publicPath is correct', t => {
  // t.pass()
  t.is(config.output.publicPath, '/')
})

