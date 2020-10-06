import test from 'ava'
import config from '../webpack.config'

test('output.publicPath is correct', t => {
  t.is(config.output.publicPath, '/')
})

