'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSecret = generateSecret;
exports.hash160 = hash160;
var RIPEMD160 = require('ripemd160');
var crypto = require('crypto-browserify');

function generateSecret() {

  var secretBuffer = crypto.randomBytes(32);
  var secret = secretBuffer.toString('hex');
  var secretHash = new RIPEMD160().update(secretBuffer).digest('hex');

  return {
    secret: secret,
    secretHash: secretHash
  };
}

function hash160(value) {
  return new RIPEMD160().update(value).digest('hex');
}