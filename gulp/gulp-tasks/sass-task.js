const sourcemaps = require('gulp-sourcemaps')
const argv = require('yargs').argv;
const {src, dest} = require('gulp')
const sass = require('gulp-sass')
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

  constructor() {
    this.src = src(dev.sass.src)
    this.stream = false
    this.pipeline = []
  }

  setStream() {
    this.stream = true
    return this
  }

  postcssPlugins() {
    let postcssPlugins = []

    if (!!(dev.postcss)) {
      postcssPlugins = argv.production
        ? [...dev.postcss, cssnano]
        : [...dev.postcss]
    }
    this.pipeline.push(postcss(postcssPlugins))
  }

  setDestination() {
    // Destination pipe

    let destination = argv.critical
      ? dest(`${dev.sass.dest}/critical`)
      : dest(dev.sass.dest)
    if (this.stream) {
      this.pipeline.push(destination)
      this.pipeline.push(browserSync.stream())
      return
    }
    this.pipeline.push(destination)
  }

  setup() {
    this.pipeline.push(sass(dev.sass.opts).on('error', sass.logError))

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
        return path.relative(dev.sass.dest, fullPath)
      }))
      this.pipeline.push(sourcemaps.write('.'))
    }

    this.setDestination()

    for (let item of this.pipeline) {
      this.src = this.src.pipe(item)
    }

    return this
  }

}

module.exports = Sass
