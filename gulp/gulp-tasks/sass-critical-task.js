const fs = require('fs');
const postcss = require('postcss');
const postcssCriticalCSS = require('postcss-critical-css')

function processFile(data, file, dest) {
    postcss([postcssCriticalCSS({outputPath: dest, preserve: argv.preserveCritical || false})])
        .process(data, {from: undefined})
        .then(result => {
            fs.writeFile(
                `${dest}/${file}`,
                result.css,
                err => {
                    if (err) {
                        console.error(`ERROR: `, err);
                        process.exit(1);
                    }
                },
            );
        });
}

module.exports = (cb) => {
    for (const {dest} of dev.sassConfigs) {

        const destPath = dest.segments.absolutePath

        fs.readdir(destPath, 'utf8', (err, files) => {
            if (err) throw err
            files.forEach(file => {
                if (/\.css?$/.test(file)) {
                    const data = fs.readFileSync(`${destPath}/${file}`)
                    processFile(data, file, destPath)
                }
            })
        })

    }

    cb()
}
