import {extractSecret} from '../src/extract-secret';

const Script = require('bitcore').Script;

const assert = require('assert');

describe('Secret', function () {
  this.timeout(5000);
  describe('#extractSecret()', function () {
    it('should extract secret for given secret hash and tx', async () => {
      const result = extractSecret("000000000188fee037e8275f7d1e8686886a12131933f481b48902859791d6f1df01496f3401000000e0483045022100f43430384ca5ecfc9ca31dd074d223836cef4801b3644c651c3a30d80fbf63b8022017dae9e7ec6f3f5ee0e0b60d146963ba85d9b31003d7f60852126f2a35492759012103b10e3690bcaf0eae7098ec794666963803bcec5acfbe6a112bc8cdc93797f002203e0b064c97247732a3b345ce7b2a835d928623cb2871c26db4c2539a38e61a16514c5163a61429c36b8dd380e0426bdc1d834e74a630bfd5d1118876a914ebcf822c4a2cdb5f6a6b9c4a59b74d66461da5816704d728bd59b17576a91406fb26221375b1cbe2c17c14f1bc2510b9f8f8ff6888acffffffff01c6dff505000000001976a914e1fce397007bad3ce051f0b1c3c7587f016cd76a88acd728bd59",
        "29c36b8dd380e0426bdc1d834e74a630bfd5d111");
      assert.equal(result, '3e0b064c97247732a3b345ce7b2a835d928623cb2871c26db4c2539a38e61a16');
    });
  });
});
