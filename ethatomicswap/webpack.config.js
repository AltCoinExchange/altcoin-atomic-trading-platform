// webpack.config.js
'use strict';

const JavaScriptObfuscator = require('webpack-obfuscator');

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
    }
    // plugins: [
    //     new JavaScriptObfuscator({
    //         rotateUnicodeArray: true
    //     }, ["source-**.js"])
    // ]
};