"use strict";

import "jest";
import {FreshBitcoinWallet} from "../src/btc/fresh-btc";
import {RegenerateBitcoinWallet} from "../src/btc/regenerate-btc";
import {BtcWalletTestNet} from "../src/btctestnet";

const phrase = "away stomach fire police satoshi wire entire awake dilemma average town napkin";
const hdPrivateKey = "tprv8ZgxMBicQKsPdxZqLMWLFLxJiYwSnP92WVXzkb3meDwix5nxQtNd21AHzn3Uv" +
  "mJAqEqGoYzR7vtZk8hrujhZVGBh1MMED8JnsNja8gEopYM";
const WIF = "cQ63rjfvri2EHn6WvR5F9KGbgaGNRMvb7y9ra8ZuTyQVeteLZ66a";

const freshWallet = new FreshBitcoinWallet(phrase);
const regenerateWallet = new RegenerateBitcoinWallet(hdPrivateKey);

describe("BtcWallet", () => {
  it("Should be pass sanity", () => {
    expect(typeof BtcWalletTestNet).toBe("function");
  });

  it("Should be able to regenerate new wallet instance", () => {
    const btcWallet = new BtcWalletTestNet();
    btcWallet.recover(regenerateWallet)
    expect(btcWallet.hdPrivateKey.privateKey.toString())
      .toEqual("4ac5d28f380439fcb79b678cb00bdc13e11cbbf8020fbc46442b724f06412c91");
  });

  it("Should be able to create new wallet instance", () => {
    const btcWallet = new BtcWalletTestNet();
    btcWallet.create(freshWallet);
    expect(btcWallet.hdPrivateKey.privateKey.toString())
      .toEqual("4ac5d28f380439fcb79b678cb00bdc13e11cbbf8020fbc46442b724f06412c91");
  });

  it("Should return wif from fresh instance", () => {
    const btcWallet = new BtcWalletTestNet();
    btcWallet.create(freshWallet);
    expect(btcWallet.WIF).toEqual(WIF);
  });

  it("Should return wif from regenerated instance", () => {
    const btcWallet = new BtcWalletTestNet();
    btcWallet.recover(regenerateWallet);
    expect(btcWallet.WIF).toEqual(WIF);
  });
});
