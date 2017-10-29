'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RIPEMD160 = require('ripemd160');
var crypto = require('crypto-browserify');

var generateSecret = exports.generateSecret = function generateSecret() {

  var secretBuffer = crypto.randomBytes(32);
  var secret = secretBuffer.toString('hex');
  var secretHash = new RIPEMD160().update(secretBuffer).digest('hex');

  return {
    secret: secret,
    secretHash: secretHash
  };
};

var hash160 = exports.hash160 = function hash160(value) {
  return new RIPEMD160().update(value).digest('hex');
};