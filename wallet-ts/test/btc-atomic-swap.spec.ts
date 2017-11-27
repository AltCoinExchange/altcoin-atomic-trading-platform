// 7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000

import "jest";
import {BtcWalletTestNet} from "../src/btctestnet";
import {SecretGenerator} from "../src/common/hashing";

import {BtcInitiateParams} from "../src/btc/atomic-swap/btc-initiate-params";

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
        const result = await wallet.initiate(new BtcInitiateParams(7200, secret.secretHash, "n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG", "0.001"));
    } catch (e) {
      expect(e.message).toEqual("insufficent funds");
    }
  });

});
