require('../../src/index').setup()
const sass = require('sass')
const File = require('../../src/File')
const fs = require('fs')

class SassStandalone {

    constructor(src, dest, options) {
        this.src = (new File(src))
        this.dest = new File(`${dest}/${this.src.nameWithoutExtension()}.css`)
        this.options = options
    }


    async render() {
        try {
            return await sass.renderSync({file: this.src.segments.absolutePath})
        } catch (error) {
            console.error(error)
        }
    }

    async write() {
        try {
            const data = await this.render(this.src.segments.absolutePath)
            await fs.writeFileSync(this.dest.segments.absolutePath, data.css, this.options)
        } catch (error) {
            console.error(error)
        }
    }

}

module.exports = SassStandalone
