const webpack = require('webpack')
const chalk = require('chalk')
const wp_config = require('../../webpack.config')

function scripts() {
  const config = wp_config
  return new Promise((resolve, reject) => webpack(config, (err, stats) => {
      if (err) throw err
    //   process.stdout.write(stats.toString({
    //     colors: true,
    //     modules: false,
    //     children: false,
    //     chunks: false,
    //     chunkModules: false,
    //   }) + '\n\n')
      if (stats.hasErrors()) {
        reject(false)
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }
      console.log(chalk.cyan('  Build complete.\n'))
      resolve(true)
    }),
  )
}
module.exports = scripts
