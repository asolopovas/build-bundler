const argv = require('yargs').argv
const webpack = require('webpack')
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
let postcssPlugins = []

if (argv.production) {
    postcssPlugins.push(
        require('autoprefixer'),
    )
}

dev
    .js(['dummy-site/src/app.js', 'dummy-site/src/app2.js'], 'dummy-site/static/js', {
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
    .sass('dummy-site/src/app.scss', 'dummy-site/static/css', {
        includePaths: ['node_modules/foundation-sites/scss'],
        postcss: [
            require('tailwindcss')('./tailwind.config.js'),
            ...postcssPlugins,
        ]
    })
    .bs({
        proxy: process.env.APP_URL,
        https: {
            key: 'src/ssl/localhost.key',
            cert: 'src/ssl/localhost.crt',
        },
    })
