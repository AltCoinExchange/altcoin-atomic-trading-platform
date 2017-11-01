'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressUtil = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _secretHash = require('./secret-hash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base58Check = require('bitcore').encoding.Base58Check;
var BufferReader = require('bitcore').encoding.BufferReader;
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
        netBuffer = Buffer.from([0x6F]);
      } else {
        netBuffer = Buffer.from([0x00]);
      }
      var pkhBuffer = Buffer.from(hash, "hex");
      var versionPayload = Buffer.concat([netBuffer, pkhBuffer], 21);
      var encoded = Base58Check.encode(versionPayload);
      return Address.fromString(encoded);
    }
    // 2MxJrAnb4eVwWMW3o39J5mj2Xq5Rtr1pVRu
    // 2MxJrAnb4eVwWMW3o39J5mj2Xq5Rtr1pVRu

  }, {
    key: 'NewAddressScriptHash',
    value: function NewAddressScriptHash(serializedScript, net) {
      // const buffer = Buffer.from(serializedScript);
      var nesto = [0x99, 0x166, 0x20, 0x41, 0x195, 0x107, 0x141, 0x211, 0x128, 0x224, 0x66, 0x107, 0x220, 0x29, 0x131, 0x78, 0x116, 0x166, 0x48, 0x191, 0x213, 0x209, 0x17, 0x136, 0x118, 0x169, 0x20, 0x235, 0x207, 0x130, 0x44, 0x74, 0x44, 0x219, 0x95, 0x106, 0x107, 0x156, 0x74, 0x89, 0x183, 0x77, 0x102, 0x70, 0x29, 0x165, 0x129, 0x103, 0x4, 0x215, 0x40, 0x189, 0x89, 0x177, 0x117, 0x118, 0x169, 0x20, 0x6, 0x251, 0x38, 0x34, 0x19, 0x117, 0x177, 0x203, 0x226, 0x193, 0x124, 0x20, 0x241, 0x188, 0x37, 0x16, 0x185, 0x248, 0x248, 0x255, 0x104, 0x136, 0x172];

      var buffer = Buffer.from(nesto);
      console.log('buffer', buffer);
      var scriptHash = Buffer.from((0, _secretHash.hash160)(serializedScript));
      console.log('=', scriptHash.length);

      var netBuffer = Buffer.from([0xC4]); //livenet 05
      var versionPayload = Buffer.concat([netBuffer, scriptHash], 21);

      var encoded = Base58Check.encode(versionPayload);
      return Address.fromString(encoded);
    }
  }]);

  return AddressUtil;
}();
// 2MwQAMPeRGdCzFzPy7DmCnQudDVGNBFJK8S