const {series} = require('gulp')
const Sass = require('./sass')

class SassTasks {

    tasks(stream = false) {
        const tasks = []
        for (const conf of dev.sassConfigs) {
            const task = cb => {
                const sassTask = new Sass(conf.src.segments.absolutePath, conf.dest.segments.absolutePath, conf.opts, task)
                return stream
                    ? sassTask.stream().build(cb)
                    : sassTask.build(cb)
            }
            Object.defineProperty(task, 'name', {value: `compiling ${conf.src.name()}`})

            tasks.push(task)
        }
        return tasks
    }

}

const sassTasks = new SassTasks()

module.exports = (stream) => series(...sassTasks.tasks(stream))
