const webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        'vendor': './vendor.ts',
        'ng2-file-uploader.webpack.umd': './index.ts',
        'ng2-file-uploader.webpack.min': './index.ts'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'bundles'),
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        pathinfo: true
    },

    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /^((?!(ngfactory|shim)).)*tsx?$/,
                use: [
                    {
                        loader: 'tslint-loader',
                    }
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        query: {
                            forkChecker: true,
                            declaration: false,
                        }
                    }
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            }
        ]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['ng2-file-uploader.umd', 'vendor']
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['ng2-file-uploader.min', 'vendor']
        }),

        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            include: /\.min\.js$/,
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitError: true,
                    failOnHint: false
                }
            }
        })
    ]
}