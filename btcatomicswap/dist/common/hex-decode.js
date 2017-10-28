'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fromHex = exports.fromHex = function fromHex(h) {
  var s = '';
  for (var i = 0; i < h.length; i += 2) {
    s += String.fromCharCode(parseInt(h.substr(i, 2), 16));
  }
  return decodeURIComponent(encodeURIComponent(s));
};