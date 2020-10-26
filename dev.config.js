require('dotenv').config()
const argv = require('yargs').argv
const dev = require('./src/index')
const webpack = require('webpack')
const postcssCriticalSplit = require('postcss-critical-split')
const postcssEnvFunction = require('postcss-env-function')

const envVars = postcssEnvFunction({
  importFrom: [
    {
      environmentVariables: {
        '--css-color': process.env.CSS_COLOR,
      },
    },
  ],
})
let postcssPlugins = [envVars]

if (argv.critical || argv.criticalRest) {
  const criticalSplit = postcssCriticalSplit(
    {output: argv.critical ? 'critical' : 'rest'},
  )
  postcssPlugins.push(
    criticalSplit,
    require('autoprefixer'),
  )
}

dev
  .js('dummy-site/src/app.js', 'dummy-site/dist/js', {
    resolve: {
      extensions: ['.css'],
      alias: {
        'vue$': 'vue/dist/vue.esm-browser.js',
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    ],
  })
  .sass('dummy-site/src/app.scss', 'dummy-site/dist/css', {
    includePaths: ['node_modules/foundation-sites/scss'],
  })
  .postcss([
    require('tailwindcss')('./tailwind.config.js'),
    ...postcssPlugins,
  ])
  .bs({
    proxy: process.env.APP_URL,
    cors: true,
    notify: false,
    https: {
      key: 'src/ssl/localhost.key',
      cert: 'src/ssl/localhost.crt',
    },
    files: [
      'src/server/**', 'dummy-site/src/**'],
    port: 3000,
    open: false,
    online: false,
  })
