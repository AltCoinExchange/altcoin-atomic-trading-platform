import {Wallet} from '../src/index';

const assert = require('assert');

describe('DcrWallet', function () {
  describe('#new DcrWallet()', function () {
    it('should generate new DcrWallet for mnemonic keywords', () => {
        console.log("test");
        const mnemonicCode = 'select scout crash enforce riot rival spring whale hollow radar rule sentence';
        const passPhrase = 'testwallt12#!';
        const dcrWallet = new Wallet.Decred.DcrWallet();
        dcrWallet.create(passPhrase);
    });
  });
});
