const sourcemaps = require('gulp-sourcemaps')
const argv = require('yargs').argv;
const {src, dest, lastRun} = require('gulp')
const sass = require('gulp-sass');
const Fiber = require('fibers')
sass.compiler = require('sass');
const JsonStore = require('../../src/JsonStore')
const path = require('path')
const cssnano = require('cssnano')({preset: 'default'})

// -------------------------------------
// Post Css
// -------------------------------------
const postcss = require('gulp-postcss')

// -------------------------------------
// Utilities
// -------------------------------------
const hash = require('../plugins/hash.js')

class Sass {

    constructor(_src, dest, options, task) {
        this.src = src(_src, {since: lastRun(task)})
        this.dest = dest
        this.options = {
            fiber: Fiber,
            includePaths: options.includePaths,
        }
        this.isStream = false
        this.pipeline = []
    }

    build() {
        this.pipeline.push(sass(this.options).on('error', sass.logError))

        this.postcssPlugins()

        // Post css piping
        if (argv.production && !argv.critical) {
            this.pipeline.push(hash(new JsonStore('dev-manifest.json')))
        }

        // Wrap pipe between src and dest with sourcemaps
        if (argv.sourcemaps) {
            this.pipeline.unshift(sourcemaps.init())
            this.pipeline.push(sourcemaps.mapSources((sourcePath, file) => {
                if (sourcePath.includes('node_modules') || new RegExp(/\.css$/).test(sourcePath)) {
                    return sourcePath
                }
                const fullPath = path.resolve(file._base, sourcePath)
                return path.relative(this.dest, fullPath)
            }))
            this.pipeline.push(sourcemaps.write('.'))
        }

        this.setDestination()

        for (let item of this.pipeline) {
            this.src = this.src.pipe(item)
        }

        return this.src
    }

    stream() {
        this.isStream = true
        return this
    }

    postcssPlugins() {
        let postcssPlugins = []

        if (!!(this.options.postcss)) {
            postcssPlugins = argv.production
                ? [
                    ...this.options.postcss, cssnano,
                ]
                : [...this.options.postcss]
        }

        this.pipeline.push(postcss(postcssPlugins))
    }

    setDestination() {
        // Destination pipe
        let destination = argv.critical
            ? dest(`${this.dest}/critical`)
            : dest(this.dest)

        if (this.isStream) {
            this.pipeline.push(destination)
            this.pipeline.push(browserSync.stream())
        } else {
            this.pipeline.push(destination)
        }

    }

}

module.exports = Sass
