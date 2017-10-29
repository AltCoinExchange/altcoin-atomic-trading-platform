import {atomicSwapContract} from '../src/contract/atomic-swap-contract';
const assert = require('assert');

describe('Script creation', function () {
  describe('#atomicSwapContract()', function () {
    it('should return SCRIPT when input is given', function () {
      const contract = atomicSwapContract(
        "n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG",
        "n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG",
        1508850335,
        "29c36b8dd380e0426bdc1d834e74a630bfd5d111");
      assert.notEqual(contract, null);
    });
  });
});
