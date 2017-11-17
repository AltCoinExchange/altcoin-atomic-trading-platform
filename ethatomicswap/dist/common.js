'use strict';

/**
 * Atomic swap class
 *
 * @author Djenad Razic
 * @company Altcoin Exchange, Inc.
 */
var Common = function Common() {

    /**
     * Generate random secret
     * @returns {{secret: (*|string), hashedSecret: *}}
     * @constructor
     */
    this.GenerateSecret = function () {

        var RIPEMD160 = require('ripemd160');
        var crypto = require('crypto-browserify');

        var secretBuffer = crypto.randomBytes(32);
        var secret = secretBuffer.toString('hex');
        var hashedSecret = new RIPEMD160().update(secretBuffer).digest('hex');

        console.log("\nSecret:\t\t\t", secret);
        console.log("\Hashed Secret:\t\t", hashedSecret, "\n");

        return { "secret": secret, "hashedSecret": hashedSecret };
    };

    /**
     * Extend object
     * @param target
     * @param source
     * @param exclude
     * @returns {*}
     * @constructor
     */
    this.Extend = function (target, source, exclude) {
        if (source) {
            for (var prop in source) {
                if (exclude && exclude.indexOf(prop) !== -1) {
                    continue;
                }

                if (source.hasOwnProperty(prop)) {
                    target[prop] = source[prop];
                }
            }
        }
        return target;
    };
};

module.exports = Common;
