const {absolutePath} = require('../helpers')
const File = require('../File')

class Sass {
    constructor() {
        this.props = ['sass']
        this.src = ''
        this.dest = ''
        this.opts = ''
    }

    set(src, dest, opts = {includePaths: []}, parent) {
        if (opts.hasOwnProperty('includePaths')) {
            let sassOpts = opts
            sassOpts.includePaths = opts.includePaths.map(path => {
                if (path) {
                    return absolutePath(path)
                }
            })
        }
        parent.sassConfigs.push({
            src: new File(src),
            dest: new File(dest),
            opts,
        })
        this.src = src
        this.dest = dest

        return parent
    }

    get() {
        return {
            src: this.src,
            dest: this.dest,
            opts: this.opts,
        }
    }

}

module.exports = new Sass
