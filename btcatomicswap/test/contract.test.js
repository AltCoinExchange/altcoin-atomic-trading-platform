import {buildContract} from '../src/contract/build-contract';
import {generateSecret} from '../src/common/secret-hash';
import {getUnixTimeFor2Days} from '../src/common/unix-ts';
import {extractAtomicSwapContract} from '../src/contract/extract-atomic-swap-contract';

const Script = require('bitcore').Script;

const assert = require('assert');

describe('Contract', function () {
  this.timeout(5000);
  describe('#buildContract()', function () {
    it('should create contract', async () => {
      const {secretHash} = generateSecret();
      const lockTime = getUnixTimeFor2Days();
      const b = await buildContract("n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG", "0.01", lockTime, secretHash);
      assert.equal(b.contract instanceof Script, true, "Contract is instance of Script");
      assert.equal(b.contractP2SH instanceof Script, true, "Contract P2SH is instance of Script");
      assert.equal(b.contractFee.toString(), '0.00000229', "Fee is 0.00000229");
    });
  });

  describe('#extractAtomicSwapContract()', function () {
    it('should extract atomic swap contract', async () => {
      const {secretHash} = generateSecret();
      const lockTime = getUnixTimeFor2Days();
      const b = await buildContract("n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG", "0.01", lockTime, secretHash);
      const values = extractAtomicSwapContract(b.contract.toHex());
      assert.equal(Object.keys(values).length, 4);
      assert.equal(values.recipientHash, '0x0fb84f231500e5ce0700da88fecad65185699a06');
    });
  });
});
