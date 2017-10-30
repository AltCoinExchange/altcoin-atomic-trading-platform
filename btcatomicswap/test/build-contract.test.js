import {buildContract} from '../src/contract/build-contract';
import {generateSecret} from '../src/common/secret-hash';
import {getUnixTimeFor2Days} from '../src/common/unix-ts';

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
      assert.equal(b.contractTxHash.length, 446, "Contract tx is 446 chars long");
    });
  });
});
