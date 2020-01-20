const argv = require('yargs').argv
const dev = require('./src/index')
const webpack = require('webpack')
const postcssCriticalSplit = require('postcss-critical-split')

const postcssPlugins = []

if (argv.production) {
  postcssPlugins.push(require('cssnano')({preset: 'default'}))
}

if (argv.critical) {
  postcssPlugins.push(postcssCriticalSplit({
    start: 'critical:start',
    stop: 'critical:end',
    suffix: '-critical',
    output: this.critical.output,
  }))
}

dev
  .js('dummy-site/src/app.js', 'dummy-site/dist/js', {
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts', '.vue', '.svg'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      },
      modules: [
        'node_modules',
      ],
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
    require('tailwindcss')('./tailwind-config.js'),
  ])
  .bs({
    proxy: process.env.APP_URL,
    cors: true,
    notify: false,
    port: 3000,
    open: false,
    online: false,
  })
