const sourcemaps = require('gulp-sourcemaps')
const argv = require('yargs').argv;
const {src, dest} = require('gulp')
const sass = require('gulp-sass')
const JsonStore = require('../../src/JsonStore')
const {publicPath, file} = require('../../src/helpers')
const path = require('path')
// -------------------------------------
// Post Css
// -------------------------------------
const postcss = require('gulp-postcss')
const cssnano = require('cssnano') // minimize
const postcssCriticalSplit = require('postcss-critical-split')

// -------------------------------------
// Utilities
// -------------------------------------
const hash = require('../plugins/hash.js')

class Sass {

  constructor() {
    this.src = src(dev.sass.src)
    this.critical = {enabled: false, output: 'rest'}
    this.stream = false
    this.production = argv.production
    this.sourcemaps = argv.sourcemaps
    this.pipeline = []
  }

  setStream() {
    this.stream = true
    return this
  }

  setCritical(output = 'critical') {
    this.critical = {enabled: true, output}

    return this
  }

  postcssPlugins() {
    let postcssPlugins = []
    if (!!(dev.postcss)) {
      postcssPlugins = [...dev.postcss]
    }
    if (this.critical.enabled) {
      const csOpts = {
        start: 'critical:start',
        stop: 'critical:end',
        suffix: '-critical',
        output: this.critical.output,
      }
      postcssPlugins.push(postcssCriticalSplit(csOpts))
    }

    if (this.production) {
      postcssPlugins.push(cssnano({preset: 'default'}))
    }

    this.pipeline.push(postcss(postcssPlugins))

  }

  setDestination() {
    // Destination pipe
    let destination = dest(dev.sass.dest)
    if (this.stream) {
      this.pipeline.push(destination)
      this.pipeline.push(browserSync.stream())
      return
    } else if (this.critical.enabled && this.critical.output === 'critical') {
      destination = dest(`${dev.sass.dest}/critical`)
    }
    this.pipeline.push(destination)
  }

  setup() {
    this.pipeline.push(sass(dev.sass.opts).on('error', sass.logError))

    this.postcssPlugins()

    // Post css piping
    if (this.production && this.critical.output !== 'critical') {
      this.pipeline.push(hash(new JsonStore('dev-manifest.json')))
    }

    // Wrap pipe between src and dest with sourcemaps
    if (this.sourcemaps) {
      this.pipeline.unshift(sourcemaps.init())
      this.pipeline.push(sourcemaps.mapSources((sourcePath, file) => {
        if (sourcePath.includes('node_modules') || new RegExp('.css$').test(sourcePath)) {
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
