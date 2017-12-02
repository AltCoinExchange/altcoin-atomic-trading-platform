// 7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000

import "jest";

import {BtcInitiateParams} from "../src/btc/atomic-swap/btc-initiate-params";
import {FreshBitcoinWallet} from "../src/btc/fresh-btc";
import {RegenerateBitcoinWallet} from "../src/btc/regenerate-btc";
import {BtcWalletTestNet} from "../src/btctestnet/btc-wallet-testnet";
import {SecretGenerator} from "../src/common/hashing";

const phrase = "away stomach fire police satoshi wire entire awake dilemma average town napkin";
const hdPrivateKey = "tprv8ZgxMBicQKsPdxZqLMWLFLxJiYwSnP92WVXzkb3meDwix5nxQtNd21AHzn3Uv" +
  "mJAqEqGoYzR7vtZk8hrujhZVGBh1MMED8JnsNja8gEopYM";
const WIF = "cQ63rjfvri2EHn6WvR5F9KGbgaGNRMvb7y9ra8ZuTyQVeteLZ66a";

const freshWallet = new FreshBitcoinWallet(phrase);
const regenerateWallet = new RegenerateBitcoinWallet(hdPrivateKey);

describe("BtcAtomicSwap", () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  it("Should pass sanity", () => {
    expect(typeof BtcWalletTestNet).toBe("function");
  });

  it("Should pass initiate", async () => {
    expect.assertions(1);

    const secret = SecretGenerator.generateSecret();

    try {
      const wallet = new BtcWalletTestNet();
      wallet.recover(regenerateWallet);
      const result = await wallet
        .initiate(new BtcInitiateParams(7200, secret.secretHash, "n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG", "0.005"));
      console.log(result);
      expect(result.fee).toEqual(100000);
    } catch (e) {
      expect(e.message).toEqual("insufficent funds");
    }
  });

});
