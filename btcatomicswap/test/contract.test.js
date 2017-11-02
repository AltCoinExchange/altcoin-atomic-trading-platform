import {buildContract} from '../src/contract/build-contract';
import {generateSecret} from '../src/common/secret-hash';
import {getUnixTimeFor2Days} from '../src/common/unix-ts';
import {extractAtomicSwapContract} from '../src/contract/extract-atomic-swap-contract';
import {atomicSwapContract} from '../src/contract/atomic-swap-contract';

const Script = require('bitcore').Script;
const Address = require('bitcore').Address;

const assert = require('assert');

describe('Contract', function () {
  this.timeout(5000);
  describe('#buildContract()', function () {
    it.only('should create contract', async () => {
      const {secretHash} = generateSecret();
      const lockTime = getUnixTimeFor2Days();
      const b = await buildContract("n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG", "0.0001", lockTime, secretHash);
      assert.equal(b.contract instanceof Script, true, "Contract is instance of Script");
      assert.equal(b.contractP2SH instanceof Address, true, "Contract P2SH is instance of Script");
      assert.equal(b.contractP2SHPkScript instanceof Script, true, "Contract P2SH is instance of Script");
      assert.equal(b.contractFee.toString(), '0.00000676', "Fee is 0.00000676");
    });
  });

  describe('#extractAtomicSwapContract()', function () {
    it('should extract atomic swap contract', async () => {
      const {secretHash} = generateSecret();
      const lockTime = getUnixTimeFor2Days();
      const b = await buildContract("n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG", "0.001", lockTime, secretHash);
      const values = extractAtomicSwapContract(b.contract.toHex());

      assert.equal(Object.keys(values).length, 4);
      assert.equal(values.recipientHash, '0xebcf822c4a2cdb5f6a6b9c4a59b74d66461da581');
    });
  });

  describe('atomicSwapContract', function () {
    it('should create atomic swap contract', () => {

      const refundAddr = "mfbEx6gfMVNqjg5bb7C8RBqqYAbbEPue2b";
      const them = "n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG";
      const lockTime = 1509793660;
      const secretHash = "34143f8d50ca0ffe331526928c3ebeb393486d9e";

      const refundAddressHash = new Address(refundAddr).toJSON().hash;
      const themHash = new Address(them).toJSON().hash;

      const result = atomicSwapContract(refundAddressHash, themHash, lockTime, secretHash);
      assert.equal(result.toHex(), '63a61434143f8d50ca0ffe331526928c3ebeb393486d9e8876a914ebcf822c4a2cdb5f6a6b9c4a59b74d66461da58167047c9ffd59b17576a91400cf91499ec86541ccaebbc5aaa2536b4e26c1ad6888ac');
    });
  });
});
