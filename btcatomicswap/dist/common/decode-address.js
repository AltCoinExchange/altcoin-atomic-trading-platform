'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bs58 = require('bs58');
var Buffer = require('buffer/').Buffer;

var decodeAddress = exports.decodeAddress = function decodeAddress(rawAddress) {
  var decodedAddress = bs58.decode(rawAddress);
  return new Buffer(decodedAddress).toString('hex'); // TODO change to browserify
};
