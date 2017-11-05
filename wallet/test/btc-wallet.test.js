import {Wallet} from '../src/index';

const assert = require('assert');

describe('BtcWallet', function () {
  describe('#new BtcWallet()', function () {
    it('should generate new BtcWallet for mnemonic keywords', async () => {
      const mnemonicCode = 'select scout crash enforce riot rival spring whale hollow radar rule sentence';
      const passPhrase = 'testwallt12#!';
      const btcWallet = new Wallet.Bitcoin.BtcWallet(mnemonicCode);
      btcWallet.generateHDPrivateKey(passPhrase);

      const hdPrivateKey = btcWallet.deriveHdPrivateKey(1);
      const hdPublicKey = hdPrivateKey.hdPublicKey;
      const address = btcWallet.generateAddress(hdPublicKey);

      assert.equal(address.toString(), 'mjwJRsgU4pMtkhZiLadrasmPJ6v4L4Khf2');
      assert.equal(Object.keys(btcWallet.addressess).length, 1);
      assert.equal(Object.keys(btcWallet.derived).length, 1);
      assert.equal(btcWallet.hdPrivateKey, 'tprv8ZgxMBicQKsPduGeY6hbXFTfS8k86Cwcpkrrchag7xf18KkHP9kdr2shydHT669xmzFb3B6E4m2jpfacpNpr9RsBH67Lh42k1ywdREEQfaB');



      // second derivation
      const hdPrivateKey2 = btcWallet.deriveHdPrivateKey(2);
      const hdPublicKey2 = hdPrivateKey2.hdPublicKey;
      const address2 = btcWallet.generateAddress(hdPublicKey2);

      assert.equal(address2.toString(), 'mgjR4G9V7Hyvy5S2DtpRJKBubsU1pKR4bA');
      assert.equal(Object.keys(btcWallet.addressess).length, 2);
      assert.equal(Object.keys(btcWallet.derived).length, 2);
      assert.equal(btcWallet.hdPrivateKey, 'tprv8ZgxMBicQKsPduGeY6hbXFTfS8k86Cwcpkrrchag7xf18KkHP9kdr2shydHT669xmzFb3B6E4m2jpfacpNpr9RsBH67Lh42k1ywdREEQfaB');

      const address2FromWallet = btcWallet.addressess[hdPublicKey2];
      assert.equal(address2FromWallet.toString(), 'mgjR4G9V7Hyvy5S2DtpRJKBubsU1pKR4bA');
    });
  });
});
