// webpack.config.js
'use strict';
var webpack = require("webpack");
var path = require('path');

//const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    entry: {
        'main': './modules/bundle.js'
    },
    output: {
        path: __dirname + "/dist",
        filename: 'dist.js'
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                test: /\.js$/,
                query: {
                    plugins: [],
                    presets: ['env']
                }
            }
        ]
    },
    // plugins: [
    //     new JavaScriptObfuscator({
    //         rotateUnicodeArray: true
    //     }, ["source-**.js"])
    // ]
};
