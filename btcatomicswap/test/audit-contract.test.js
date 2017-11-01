import {auditContract} from '../src/audit-contract';

const Script = require('bitcore').Script;

const assert = require('assert');

describe('Audit Contract', function () {
  this.timeout(5000);
  describe('#auditContract()', function () {
    it('should give results from contract', async () => {
      const result = auditContract("63a61429c36b8dd380e0426bdc1d834e74a630bfd5d1118876a914ebcf822c4a2cdb5f6a6b9c4a59b74d66461da5816704d728bd59b17576a91406fb26221375b1cbe2c17c14f1bc2510b9f8f8ff6888ac",
        "010000000267864c7145e43c84d13b514518cfdc7ca5cf2b04764ed2672caa9c8f6338a3e3010000006b483045022100901602e523f25e9659951d186eec7e8b9df9d194e8013fb6d7a05e4eafdbb61602207b66e0179a42c54d4fcfca2b1ccd89d56253cc83724593187713f6befb37866201210288ef714849ce7735b64ed886d056b80d0a384ca299090f684820d31e7682825afeffffff3ac58ce49bcef3d047ea80281659a78cd7ef8537ca2bfce336abdce41450d2d7000000006b483045022100bd1246fc18d26a9cc85c14fb60655da2f2e845af906504b8ba3acbb1b0ebf08202201ec2cd5a0c94e9e6b971ec3198be0ff57e91115342cd98ccece98d8b18294d86012103406e35c37b3b85481db7b7f7807315720dd6486c25e4f3af93d5d5f21e743881feffffff0248957e01000000001976a914c1925e7398d325820bba18726c387e9d80047ef588ac00e1f5050000000017a9142d913627b881255c417787cc255ccad9a33ce48d8700000000");
      assert.equal(result.contractSH, '2MwQAMPeRGdCzFzPy7DmCnQudDVGNBFJK8S');
      assert.equal(result.contractValue, '1 BTC');
      assert.equal(result.recipientAddress, 'n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG');
      assert.equal(result.refundAddress, 'mg9sDLhfByfAWFo4zq3JZ7nsLfsN59XPue');
      assert.equal(result.secretHash, '29c36b8dd380e0426bdc1d834e74a630bfd5d111');
    });
  });
});
