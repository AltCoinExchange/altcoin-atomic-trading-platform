import {Wallet} from '../src/index';

const assert = require('assert');

describe('DcrWallet', function () {
  describe('#new DcrWallet()', function () {
    it('should generate new BtcWallet for mnemonic keywords', async () => {
        const mnemonicCode = 'select scout crash enforce riot rival spring whale hollow radar rule sentence';
        const passPhrase = 'testwallt12#!';
        const btcWallet = new Wallet.Decred.DcrWallet(mnemonicCode);
        btcWallet.generateHDPrivateKey(passPhrase);
    });
  });
});
