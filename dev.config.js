const argv = require('yargs').argv
const webpack = require('webpack')
const postcssCriticalSplit = require('postcss-critical-split')
const postcssEnvFunction = require('postcss-env-function')

const envVars = postcssEnvFunction({
    importFrom: [
        {
            environmentVariables: {
                '--css-color': process.env.CSS_COLOR,
            },
        },
    ],
})
let postcssPlugins = [envVars]

if (argv.critical || argv.criticalRest) {
    const criticalSplit = postcssCriticalSplit(
        {output: argv.critical ? 'critical' : 'rest'},
    )
    postcssPlugins.push(
        criticalSplit,
        require('autoprefixer'),
    )
}

dev
    .js(['dummy-site/src/app.js', 'dummy-site/src/app2.js'], 'dummy-site/dist/js', {
        resolve: {
            extensions: ['.css'],
            alias: {
                'vue$': 'vue/dist/vue.esm-browser.js',
            },
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            }),
        ],
    })
    .sass('dummy-site/src/app.scss', 'dummy-site/static', {
        includePaths: ['node_modules/foundation-sites/scss'],
    })
    .sass('dummy-site/src/app2.scss', 'dummy-site/dist/css', {
        includePaths: ['node_modules/foundation-sites/scss'],
    })
    .postcss([
        require('tailwindcss')('./tailwind.config.js'),
        ...postcssPlugins,
    ])
    .bs({
        proxy: process.env.APP_URL,
        https: {
            key: 'src/ssl/localhost.key',
            cert: 'src/ssl/localhost.crt',
        },
    })
