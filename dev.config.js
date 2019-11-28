const dev = require('./src/index')
const webpack = require('webpack')

dev.js('dummy-site/src/app.js', 'dummy-site/dist/js',
  {
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
        'window.jQuery': 'jquery'
      })
    ],
  }).sass('dummy-site/src/app.scss', 'dummy-site/dist/css', {
  includePaths: ['node_modules/foundation-sites/scss'],
}).bs({
  proxy: process.env.APP_URL,
  cors: true,
  notify: false,
  port: 3000,
  open: false,
  online: false,
})
