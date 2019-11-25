const dev = require('./src/index')

dev.js('dummy-site/src/app.js', 'dummy-site/dist',
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
  }).sass('dummy-site/src/app.scss', 'dummy-site/build', {
  includePaths: ['node_modules/foundation-sites/scss'],
}).bs({
  proxy: process.env.APP_URL,
  cors: true,
  notify: false,
  port: 3000,
  open: false,
  online: false,
})
