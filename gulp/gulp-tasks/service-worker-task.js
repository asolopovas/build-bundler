const argv = require('yargs').argv
const workbox = require('workbox-build')
const {watch} = require('gulp')

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

function watchSW() {
  generateSW()
  watch(dev.workbox.swSrc, generateSW)
}

module.exports = argv.watch ? watchSW : generateSW
