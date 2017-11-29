import {ScriptUtil} from '../src/common/script-util';
import {hash160} from '../src/common/secret-hash';
const assert = require('assert');

describe('ScriptUtil', function () {
  describe('#payToPubKeyHashScript()', function () {
    it('should generate P2HS from address', async () => {
      const script = ScriptUtil.payToPubKeyHashScript(hash160("mjiTPTecWwU9SXg6QxuekWwdbfbgbE2D12"));
      assert.equal(script.toHex(), '76a91401f954e62053340cdf4c4dbed7b0dc70e51f7c3a88ac');
    });
  });
});
