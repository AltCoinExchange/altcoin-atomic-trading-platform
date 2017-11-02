"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var flatMap = exports.flatMap = function flatMap(arr) {
  return arr.reduce(function (a, b) {
    return a.concat(b);
  }, []);
};