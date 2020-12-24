const webpack = require('webpack')
const chalk = require('chalk')
const Table = require('cli-table3')
const config = require('../../webpack.config')
const Path = require('../../src/Path.js')
const path = require('path')
const {formatSize} = require('webpack/lib/SizeFormatHelpers')
const log = console.log

class WebpackTask {

    /**
     * Generate the stats table.
     *
     * @param {any} data
     * @returns {string}
     */
    statsTable(data) {
        const table = new Table({
            head: [chalk.bold('Src'), chalk.bold('Dest'), chalk.bold('Size')],
            colWidths: [35],
            style: {
                head: []
            }
        })
        const destPath = path.relative(config.context, data.outputPath)

        for (const asset of data.assets) {
            let assetChunkName = asset.chunks[0]
            let assetPath = path.relative(config.context, path.resolve(config.entry[assetChunkName][0]))

            table.push([chalk.green(assetPath), chalk.green(`${destPath}/${asset.name}`), formatSize(asset.size)])
        }

        return table.toString()
    }

    build() {
        return new Promise(
            (resolve, reject) => webpack(config, (err, stats) => {
                if (err) throw err

                const statsObj = stats.toJson({
                    assets: true,
                    builtAt: true,
                    hash: true,
                    performance: true
                })


                if (statsObj.assets.length) {
                    console.log(this.statsTable(statsObj))
                }

                if (stats.hasErrors()) {
                    reject(false)
                    log(chalk.red('  Build failed with errors.\n'))
                    process.exit(1)
                }
                log(chalk.green(' Build complete.'))
                resolve(true)
            })
        )
    }
}

module.exports = new WebpackTask
