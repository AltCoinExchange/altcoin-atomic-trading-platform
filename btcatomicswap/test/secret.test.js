import {extractSecret} from '../src/extract-secret';

const Script = require('bitcore').Script;

const assert = require('assert');

describe('Secret', function () {
  this.timeout(5000);
  describe('#extractSecret()', function () {
    it.only('should extract secret for given secret hash and tx', async () => {
      const result = extractSecret("01000000013dc07a627df4fba0efa9edeafee5b0d3eb5793ee7d135bedee3a63559f1425f000000000df4730440220574f19a8bee31f66c2380d69338c07742471e3bda9e53ad1c1ab5f93d735358a02207df33c21a8600e1213c22b5ea56ed97869e49e44f6564471cbd38215b9ef578301210263a131db9f54c8bc19c5602cca56c0e156b17430b45a09081ec8405297060908203a7a4ca9a46992bbd3ec226c5b587fe9b558f0acaf3cb1f236bab9399fbe6c40514c5163a614f0a59b9cb174a01b4a33f70274397726cff2b84c8876a9144ff94075bfd8e49cd5bad195371a3389be5f19686704602f0c5ab17576a9144ff94075bfd8e49cd5bad195371a3389be5f19686888acffffffff0191730000000000001976a914566465fd4ac69a7e33fa834a1ca3eea88d97ed1988ac00000000",
        "f0a59b9cb174a01b4a33f70274397726cff2b84c");
      assert.equal(result, '3a7a4ca9a46992bbd3ec226c5b587fe9b558f0acaf3cb1f236bab9399fbe6c40');
    });
  });
});
