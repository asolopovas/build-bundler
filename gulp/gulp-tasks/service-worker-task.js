const argv = require('yargs').argv
const workbox = require('workbox-build')
const {watch} = require('gulp')
const {absolutePath} = require('../../src/helpers')

function generateSW() {
  return workbox.injectManifest(dev.workbox).then(({warnings}) => {
    // In case there are any warnings from workbox-build, log them.
    for (const warning of warnings) {
      console.warn(warning)
    }
  }).catch((error) => {
    console.warn('Service worker generation failed', error)
  })
}

function watchSW(cb) {
  generateSW()
  watch(absolutePath(dev.workbox.swSrc), generateSW)
  cb()
}

module.exports = argv.watch ? watchSW : generateSW
