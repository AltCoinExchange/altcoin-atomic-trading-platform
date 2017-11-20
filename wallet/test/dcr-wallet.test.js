//process.env['SSL_CIPHER'] = 'HIGH+ECDSA';
import {Wallet} from '../src/index';
const assert = require('assert');

describe('DcrWallet', function () {
  describe('#new DcrWallet()', function () {
    it('should generate new DcrWallet for mnemonic keywords', () => {
        console.log("test");
        const mnemonicCode = 'select scout crash enforce riot rival spring whale hollow radar rule sentence';
        const passPhrase = 'testwallt12#!';
        const dcrWallet = new Wallet.Decred.DcrWallet(mnemonicCode);

        //dcrWallet.test();
        //dcrWallet.getInfo();
        //dcrWallet.login("testWallet", "pwd");
        //dcrWallet.listAccounts();
        //dcrWallet.getBalance();
        try {
            dcrWallet.initiate('TsWjioPrP8E1TuTMmTrVMM2BA4iPrjQXBpR', 0.001, "cQ63rjfvri2EHn6WvR5F9KGbgaGNRMvb7y9ra8ZuTyQVeteLZ66a");
        } catch (e) {
            console.log(e);
        }
        //dcrWallet.create("testWallet", "bedrock");
        //dcrWallet.login("testWallet", "bedrock");
    });
  });
});
