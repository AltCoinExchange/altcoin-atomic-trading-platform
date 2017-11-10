'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractSecret = undefined;

var _secretHash = require('./common/secret-hash');

var _util = require('./common/util');

var buffer = require('buffer');
var Transaction = require('bitcore').Transaction;
var Script = require('bitcore').Script;

var extractSecret = exports.extractSecret = function extractSecret(redemptionTx, secretHash) {
  var transaction = new Transaction(redemptionTx);
  var txData = (0, _util.flatMap)(transaction.toJSON().inputs.map(function (input) {
    var script = new Script(input.scriptString);
    var pops = script.toString().split(' ');
    var data = pops.filter(function (opcode) {
      return opcode.indexOf('0x') !== -1;
    }).map(function (opdata) {
      return opdata.replace('0x', '');
    });
    return data;
  }));
  var secret = txData.find(function (sc) {
    return (0, _secretHash.ripemd160)(buffer.Buffer.from(sc, "hex")) === secretHash;
  });
  return secret;
};
