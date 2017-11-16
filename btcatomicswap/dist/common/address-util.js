'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressUtil = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _secretHash = require('./secret-hash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var buffer = require('buffer');
var Base58Check = require('bitcore').encoding.Base58Check;
var Address = require('bitcore').Address;

var AddressUtil = exports.AddressUtil = function () {
  function AddressUtil() {
    _classCallCheck(this, AddressUtil);
  }

  _createClass(AddressUtil, null, [{
    key: 'NewAddressPubKeyHash',
    value: function NewAddressPubKeyHash(hash, net) {
      var netBuffer = void 0;
      if (net === 'testnet') {
        netBuffer = buffer.Buffer.from([0x6F]);
      } else {
        netBuffer = buffer.Buffer.from([0x00]);
      }
      var pkhBuffer = buffer.Buffer.from(hash, "hex");
      var versionPayload = buffer.Buffer.concat([netBuffer, pkhBuffer], 21);
      var encoded = Base58Check.encode(versionPayload);
      return Address.fromString(encoded);
    }
  }, {
    key: 'NewAddressScriptHash',
    value: function NewAddressScriptHash(serializedScript, net) {
      var netBuffer = void 0;
      if (net === 'testnet') {
        netBuffer = buffer.Buffer.from([0xC4]);
      } else {
        netBuffer = buffer.Buffer.from([0x05]);
      }

      var scriptBuffer = buffer.Buffer.from(serializedScript, "hex");
      var hashScriptBuffer = (0, _secretHash.hash160Buffer)(scriptBuffer);

      var versionPayload = buffer.Buffer.concat([netBuffer, hashScriptBuffer], 21);
      var encoded = Base58Check.encode(versionPayload);
      return Address.fromString(encoded);
    }
  }]);

  return AddressUtil;
}();
