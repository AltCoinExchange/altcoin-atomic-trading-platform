'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Script = require('bitcore').Script;
var Opcode = require('bitcore').Opcode;
var Buffer = require('buffer/').Buffer;

var ScriptUtil = exports.ScriptUtil = function () {
  function ScriptUtil() {
    _classCallCheck(this, ScriptUtil);
  }

  _createClass(ScriptUtil, null, [{
    key: 'payToPubKeyHashScript',
    value: function payToPubKeyHashScript(pubKeyHash) {
      var script = new Script();
      script.add(Opcode.OP_DUP);
      script.add(Opcode.OP_HASH160);
      script.add(new Buffer(pubKeyHash, 'hex'));
      script.add(Opcode.OP_EQUALVERIFY);
      script.add(Opcode.OP_CHECKSIG);
      return script;
    }
  }]);

  return ScriptUtil;
}();
