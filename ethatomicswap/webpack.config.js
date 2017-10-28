// webpack.config.js
'use strict';

const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    entry: {
        'main': './modules/bundle.js'
    },
    output: {
        path: '/Users/djenadrazic/MachinezDesign/AltCoin/ethatomicswap/ethatomicswap/dist',
        filename: 'dist.js'
    },
    plugins: [
        new JavaScriptObfuscator({
            rotateUnicodeArray: true
        }, ["source-**.js"])
    ]
};