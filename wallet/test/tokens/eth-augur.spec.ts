// // 7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000
//
// import "jest";
// import {AugurToken} from "../../src/eth-tokens/augur-testnet";
// import {SecretGenerator} from "../src/common/hashing";
// import {AtomicSwapAbi} from "../src/config/abi/atomicswap";
// import {AtomicSwapBin} from "../src/config/abi/bin";
// import {EthConfiguration} from "../src/config/config-eth";
// import {EthParticipateParams, EthRedeemParams} from "../src/eth/atomic-swap";
// import {EthInitiateParams} from "../src/eth/atomic-swap/eth-initiate-params";
// import {EthAtomicSwap} from "../src/eth/eth-atomic-swap";
// import {EthWalletTestnet} from "../src/ethtestnet/eth-wallet-testnet";
//
// describe("EthAugurBalance", () => {
//   jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
//   it("Should pass sanity", () => {
//     expect(typeof EthAtomicSwap).toBe("function");
//   });
//
//   it("Should pass ETH initiate", async () => {
//     expect.assertions(1);
//
//     const ethSwap = new AugurToken(AtomicSwapAbi, EthConfiguration.hosts[0], AtomicSwapBin);
//
//     const newAccount = ethSwap.engine.createAccount("customPassword");
//     const store = newAccount.keystore;
//     ethSwap.engine.login(store, "customPassword");
//
//     const secret = SecretGenerator.generateSecret();
//
//     try {
//       await ethSwap.initiate(
//         new EthInitiateParams(7200, EthConfiguration.hosts[1].defaultWallet, "0.001"),
//       );
//     } catch (e) {
//       expect(e.message).toEqual("Returned error: insufficient funds for gas * price + value");
//     }
//
//   });
// });
