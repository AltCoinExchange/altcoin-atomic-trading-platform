'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RIPEMD160 = require('ripemd160');
var crypto = require('crypto-browserify');

var generateSecret = exports.generateSecret = function generateSecret() {
  var secretBuffer = crypto.randomBytes(32);
  var secret = secretBuffer.toString('hex');
  var secretHash = ripemd160(secretBuffer);

  return {
    secret: secret,
    secretHash: secretHash
  };
};

/**
 * Hash256 then RIPEMD160 = hash160
 * @param value
 */

var hash160 = exports.hash160 = function hash160(value) {
  var hashScriptBuffer = crypto.createHash('sha256').update(value).digest();
  return new RIPEMD160().update(hashScriptBuffer).digest('hex');
};

var hash160Buffer = exports.hash160Buffer = function hash160Buffer(value) {
  var hash = crypto.createHash('sha256').update(value).digest();
  return new RIPEMD160().update(hash).digest();
};

var ripemd160 = exports.ripemd160 = function ripemd160(value) {
  return new RIPEMD160().update(value).digest('hex');
};

var ripemd160Buffer = exports.ripemd160Buffer = function ripemd160Buffer(value) {
  return new RIPEMD160().update(value).digest();
};