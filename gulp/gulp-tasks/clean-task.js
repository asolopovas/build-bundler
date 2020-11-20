const path = require('path')
const del = require('del');


function stringToArray(item) {
    return Array.isArray(item) ? item : [item]
}

const exclude = [
    `!${dev.js.dest}`,
    `!${dev.sass.dest}`,
    `!${dev.sass.dest}/critical`,
    `!${dev.sass.dest}/critical/**`,
    ...stringToArray(dev.sass.src).map(item => `!${dev.sass.dest}/${path.basename(item).replace('.scss', '.css')}`),
    ...stringToArray(dev.js.src).map(item => `!${dev.js.dest}/${path.basename(item)}`),
]

module.exports = async(paths, excludeDev = false) => {
    let result
    paths = stringToArray(paths)
    try {
        result = await del(excludeDev ? [...paths, ...exclude] : paths)
        return result
    } catch (error) {
        console.log(error)
    }
}
