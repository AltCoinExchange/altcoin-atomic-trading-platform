// 7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000

import "jest";
import {BtcParticipateParams, BtcRedeemParams} from "../src/btc/atomic-swap";

import {BtcInitiateParams} from "../src/btc/atomic-swap/btc-initiate-params";
import {FreshBitcoinWallet} from "../src/btc/fresh-btc";
import {RegenerateBitcoinWallet} from "../src/btc/regenerate-btc";
import {SecretGenerator} from "../src/common/hashing";
import {BitcoinWallet} from "../src/index";

const phrase = "away stomach fire police satoshi wire entire awake dilemma average town napkin";
const hdPrivateKey = "tprv8ZgxMBicQKsPeTGpn6B6ZpfF6ptrEcpDcjgfyZwWgD3bLawHEnCjLG3rN8yxGQvBQizux6puMGM1zpdn35MsMiPC785yxZs4Mv5tzugdUwx";
const WIF = "cTrYdKoNDv82qJerZjp1ym9Jh4gRTHWxnyFFXHgKVv7oDFdyrq2p";

const freshWallet = new FreshBitcoinWallet(phrase);
const regenerateWallet = new RegenerateBitcoinWallet(hdPrivateKey);

describe("BtcAtomicSwap", () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
  it("Should pass sanity", () => {
    expect(typeof 1).toBe("number");
  });
  //
  // it("Should pass initiate", async () => {
  //   expect.assertions(1);
  //
  //   // const secret = SecretGenerator.generateSecret();
  //
  //   try {
  //     const wallet = new BitcoinWallet();
  //     wallet.recover(regenerateWallet);
  //     const result = await wallet
  //       .initiate(new BtcInitiateParams(7200, WIF, "n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG", "0.07"));
  //     console.log(result);
  //     expect(result.fee).toEqual(100000);
  //   } catch (e) {
  //     expect(e.message).toEqual("insufficent funds");
  //   }
  // });
  //
  // it("Should pass participate", async () => {
  //   expect.assertions(1);
  //
  //   // const secret = SecretGenerator.generateSecret();
  //
  //   try {
  //     const wallet = new BitcoinWallet();
  //     wallet.recover(regenerateWallet);
  //
  //     const participate = new BtcParticipateParams();
  //     participate.address = "n4qSDwEgVjEN3oECNW81CCytgBgEFdbmJ1";
  //     participate.amount = "0.001";
  //     participate.secretHash = "ca8615345b6e4d222a67f344e771dcb9f16d4b78";
  //     participate.refundTime = 7200;
  //     participate.privateKey = WIF;
  //
  //     const result = await wallet.participate(participate);
  //     console.log(result);
  //     expect(result.fee).toEqual(100000);
  //   } catch (e) {
  //     expect(e.message).toEqual("insufficent funds");
  //   }
  // });
  //
  // it("Should list transactions for specific account", async () => {
  //   expect.assertions(1);
  //
  //   try {
  //     const wallet = new BitcoinWallet();
  //     wallet.recover(regenerateWallet);
  //     const result: any = await wallet.getTransactionList("mnopGXXKQdt6mXnwHeRcdWNsaksoqKcvwZ");
  //     console.log(result);
  //     expect(result.txs.length).toBeGreaterThan(0);
  //   } catch (e) {
  //     expect(e.message).toEqual("");
  //   }
  // });
  //
  // it("Should pass redeem", async () => {
  //   expect.assertions(1);
  //
  //   const secret = SecretGenerator.generateSecret();
  //
  //   const testParams1: BtcRedeemParams = new BtcRedeemParams("cQ63rjfvri2EHn6WvR5F9KGbgaGNRMvb7y9ra8ZuTyQVeteLZ66a",
  //     "4f22b54c324b94843bd28453c39292e86d9cb23c9bc6d9db0cc28fcc8ac788dc",
  //     "061116bd2751368f19d5542f8ff7b28648f73868",
  //     "63a61480eab405f2bc73c0b39663c20d9caaa05d270d888876a9144ff94075bfd8e49cd5bad195371a3389be5f1968670470142c5ab17576a9144ff94075bfd8e49cd5bad195371a3389be5f19686888ac",
  //     "01000000012cde7c0261d196f0dcfb21b7abb6d7888c17e9b1c76762713a114974e76f3843010000006b483045022100ac002d085a9984de0fbf4149a50973c4f3041642f99cfffeb907e0226959e71d022008932690a94c932dbde1bc7c454a30141fe17030eb1dcdd537ad9d070fcd08d901210263a131db9f54c8bc19c5602cca56c0e156b17430b45a09081ec8405297060908ffffffff02fd8200000000000017a914d70e0b7087c43bb16119219012a19d6dce6016a187eeb19506000000001976a9144ff94075bfd8e49cd5bad195371a3389be5f196888ac00000000",
  //   );
  //
  //   const testParams2: BtcRedeemParams = new BtcRedeemParams("cQ63rjfvri2EHn6WvR5F9KGbgaGNRMvb7y9ra8ZuTyQVeteLZ66a",
  //     "36f209107fe48529db208e3cbe91eb84f5845948f382ea1ae50345dedc4121e3",
  //     "5768c91adf31427e8b17ec73693b728b8d3c0999",
  //     "63a61480eab405f2bc73c0b39663c20d9caaa05d270d888876a9144ff94075bfd8e49cd5bad195371a3389be5f1968670470142c5ab17576a9144ff94075bfd8e49cd5bad195371a3389be5f19686888ac",
  //     "01000000012cde7c0261d196f0dcfb21b7abb6d7888c17e9b1c76762713a114974e76f3843010000006b483045022100ac002d085a9984de0fbf4149a50973c4f3041642f99cfffeb907e0226959e71d022008932690a94c932dbde1bc7c454a30141fe17030eb1dcdd537ad9d070fcd08d901210263a131db9f54c8bc19c5602cca56c0e156b17430b45a09081ec8405297060908ffffffff02fd8200000000000017a914d70e0b7087c43bb16119219012a19d6dce6016a187eeb19506000000001976a9144ff94075bfd8e49cd5bad195371a3389be5f196888ac00000000",
  //   );
  //
  //   const testParams3: BtcRedeemParams = new BtcRedeemParams("cQ63rjfvri2EHn6WvR5F9KGbgaGNRMvb7y9ra8ZuTyQVeteLZ66a",
  //     "36f209107fe48529db208e3cbe91eb84f5845948f382ea1ae50345dedc4121e3",
  //     "5768c91adf31427e8b17ec73693b728b8d3c0999",
  //     "63a61480eab405f2bc73c0b39663c20d9caaa05d270d888876a9144ff94075bfd8e49cd5bad195371a3389be5f1968670470142c5ab17576a9144ff94075bfd8e49cd5bad195371a3389be5f19686888ac",
  //     "01000000012cde7c0261d196f0dcfb21b7abb6d7888c17e9b1c76762713a114974e76f3843010000006b483045022100ac002d085a9984de0fbf4149a50973c4f3041642f99cfffeb907e0226959e71d022008932690a94c932dbde1bc7c454a30141fe17030eb1dcdd537ad9d070fcd08d901210263a131db9f54c8bc19c5602cca56c0e156b17430b45a09081ec8405297060908ffffffff02fd8200000000000017a914d70e0b7087c43bb16119219012a19d6dce6016a187eeb19506000000001976a9144ff94075bfd8e49cd5bad195371a3389be5f196888ac00000000",
  //   );
  //
  //   try {
  //     const wallet = new BitcoinWallet();
  //     wallet.recover(regenerateWallet);
  //     const result = await wallet.redeem(testParams2);
  //     console.log(result);
  //     expect(result).toBeTruthy();
  //   } catch (e) {
  //     expect(e.message).toEqual("true");
  //   }
  // });

});
