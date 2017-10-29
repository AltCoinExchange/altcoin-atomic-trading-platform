import {atomicSwapContract} from '../src/contract/atomic-swap-contract';
import {participate} from '../src/participate';
const assert = require('assert');

describe('Script creation', function () {
  describe('#atomicSwapContract()', function () {
    it('should return SCRIPT when input is given', function () {
      participate("TsfWDVTAcsLaHUhHnLLKkGnZuJz2vkmM6Vr", "0.01", "29c36b8dd380e0426bdc1d834e74a630bfd5d111");
    });
  });
});
