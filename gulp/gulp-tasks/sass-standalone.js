const sass = require('sass')
const dev = require('../../src/config')
const File = require('../../src/File')
const log = console.log
const fs = require('fs')

class Sass {

    constructor() {
        this.tasks = this.processTasks(dev.sassTasks)
    }

    processTasks(tasks) {
        let out = []
        for (let {src, dest} of tasks) {
            src = new File(src)
            dest = new File(`${dest}/${src.nameWithoutExtension()}.css`)
            out.push({
                src,
                dest
            })
        }
        return out
    }

    async render(file) {
        try {
            return await sass.renderSync({file: file})
        } catch (error) {
            log(error)
        }
    }

    async process(inFile, outFile) {
        try {
            const data = await this.render(inFile)
            await fs.writeFileSync(outFile, data.css)
        } catch (error) {
            console.error(error)
        }
    }

    async start() {
        try {
            for (let {src, dest} of this.tasks) {
                await this.process(src.segments.absolutePath, dest.segments.absolutePath)
            }
        } catch (err) {
            console.error(err)
        }
    }

}


module.exports = new Sass
