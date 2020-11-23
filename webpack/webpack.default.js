const argv = require('yargs').argv
const TerserPlugin = require('terser-webpack-plugin');
const Path = require('../src/Path')

module.exports = function() {
    return {
        context: Path.root(),
        mode: argv.production ? 'production' : 'development',
        watch: argv.watch,
        entry: {},
        output: {
            path: '',
            filename: argv.production ? '[name].[hash].js' : '[name].js',
            chunkFilename: '[id].[chunkhash].js',
            publicPath: false,
            pathinfo: true,
        },
        module: {rules: []},

        plugins: [],

        stats: {
            hash: false,
            version: false,
            timings: false,
            children: false,
            errorDetails: false,
            entrypoints: false,
            performance: argv.production || false,
            chunks: false,
            modules: false,
            reasons: false,
            source: false,
            publicPath: false,
            builtAt: false,
        },

        performance: {
            hints: false,
        },

        optimization: argv.production
            ? {
                minimizer: [
                    new TerserPlugin({
                        parallel: 8,
                        extractComments: false,
                        terserOptions: {
                            format: {
                                comments: false,
                            },
                            compress: {
                                warnings: false,
                            },
                        },
                    }),
                ],
            }
            : {},
        devtool: argv.production ? 'source-map' : 'eval-source-map',
        target: 'web',
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.tsx', '.ts', '.vue', '.svg'],
            modules: ['node_modules'],
        },
        plugins: [],
    };
}
