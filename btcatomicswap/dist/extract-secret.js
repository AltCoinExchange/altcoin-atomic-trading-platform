'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractSecret = undefined;

var _secretHash = require('./common/secret-hash');

var Transaction = require('bitcore').Transaction;
var Script = require('bitcore').Script;

var extractSecret = exports.extractSecret = function extractSecret(redemptionTx, secretHash) {
  var transaction = new Transaction(redemptionTx);

  var secret = void 0;
  transaction.toJSON().inputs.some(function (input) {
    var script = new Script(input.scriptString);
    var pops = script.toString().split(' ');
    var data = pops.filter(function (opcode) {
      return opcode.indexOf('0x') !== -1;
    }).map(function (opdata) {
      return opdata.replace('0x', '');
    });

    var sc = data.find(function (d) {
      return (0, _secretHash.hash160)(Buffer.from(d, "hex")) === secretHash;
    });
    secret = sc;

    return sc;
  });
  console.log(secret);
  return secret;
};