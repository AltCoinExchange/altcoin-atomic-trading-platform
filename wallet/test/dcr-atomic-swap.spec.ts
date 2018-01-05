// 7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000

import "jest";

import {BtcInitiateParams} from "../src/btc/atomic-swap";
import {DcrWalletTestNet} from "../src/dcrtestnet";
import {SecretGenerator} from "../src/common";

describe("DcrAtomicSwap", () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  it("Should pass sanity", () => {
    expect(typeof DcrWalletTestNet).toBe("function");
  });

  // it("Should pass initiate", async () => {
  //   expect.assertions(1);
  //
  //   const secret = SecretGenerator.generateSecret();
  //
  //   try {
  //     const wallet = new DcrWalletTestNet();
  //     const result = await wallet
  //       .initiate(new BtcInitiateParams(7200, secret.secretHash, "n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG", "0.001"));
  //   } catch (e) {
  //     expect(e.message).toEqual("insufficent funds");
  //   }
  // });

});
