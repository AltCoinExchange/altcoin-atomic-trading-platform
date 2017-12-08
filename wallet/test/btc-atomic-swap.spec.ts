// 7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000

import "jest";
import {BtcRedeemParams} from "../src/btc/atomic-swap";

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

  it("Should pass redeem", async () => {
    expect.assertions(1);

    const secret = SecretGenerator.generateSecret();

    try {
      const wallet = new BtcWalletTestNet();
      wallet.recover(regenerateWallet);
      const result = await wallet
        .redeem(new BtcRedeemParams("cQ63rjfvri2EHn6WvR5F9KGbgaGNRMvb7y9ra8ZuTyQVeteLZ66a",
          "391774d45e2fd653f08df1e4235569298f445d969d4317206058fafb830dd103",
          "1ca480d8e18f795b36657c8a8b32d190ccbc03b9",
          "63a6141ca480d8e18f795b36657c8a8b32d190ccbc03b98876a9144ff94075bfd8e49cd5bad195371a3389be5f19686704c4e5295ab17576a9144ff94075bfd8e49cd5bad195371a3389be5f19686888ac",
          "010000000195cd3e217d2c24383671d497d5500059b5b028be08d2ee207468711ff5a3879a010000006a47304402207a44546b79b358664b31321d4b6176275dab2f7b776d53bde696b2e693e25f86022039bd3dceeaa0307e48525ff412e1eb80819895323f13bf72c3d6419e68fcd75101210263a131db9f54c8bc19c5602cca56c0e156b17430b45a09081ec8405297060908ffffffff021e0900000000000017a914471563bc65cafecc47d69de58e766605fc5dfd2987d59f4207000000001976a9144ff94075bfd8e49cd5bad195371a3389be5f196888ac00000000",
        ));
      console.log(result);
      expect(result.redeemTx).toBeTruthy();
    } catch (e) {
      expect(e.message).toEqual("true");
    }
  });

});
