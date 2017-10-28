'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _initiate = require('./initiate');

Object.keys(_initiate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _initiate[key];
    }
  });
});