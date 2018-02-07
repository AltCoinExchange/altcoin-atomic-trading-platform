// 7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000

import "jest";
import {SecretGenerator} from "../src/common/hashing";
import {EthConfiguration} from "../src/config/config-eth";
import {EthInitiateParams} from "../src/eth/atomic-swap/eth-initiate-params";
import {EthAtomicSwap} from "../src/eth/eth-atomic-swap";

describe("EthAtomicSwap", () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    it("Should pass sanity", () => {
        expect(typeof EthAtomicSwap).toBe("function");
    });

    it("Should pass ETH initiate", async () => {
        expect.assertions(1);

        const ethSwap = new EthAtomicSwap("testnet");

        const newAccount = ethSwap.engine.createAccount("customPassword");
        const store = newAccount.keystore;
        ethSwap.engine.login(store);

        const secret = SecretGenerator.generateSecret();

        try {
            await ethSwap.initiate(
                new EthInitiateParams(7200, EthConfiguration.hosts[1].defaultWallet, "0.001"),
            );
        } catch (e) {
            expect(e.message).toEqual("Returned error: insufficient funds for gas * price + value");
        }

    });
    //
    // it("Should pass participate", async () => {
    //   expect.assertions(1);
    //   // tslint:disable-next-line
    //   const privKey = "tprv8ZgxMBicQKsPdxZqLMWLFLxJiYwSnP
    // 92WVXzkb3meDwix5nxQtNd21AHzn3UvmJAqEqGoYzR7vtZk8hrujhZVGBh1MMED8JnsNja8gEopYM";
    //
    //   const ethSwap = new EthWalletTestnet();
    //   const ks = ethSwap.recover(privKey);
    //   ethSwap.login(ks, privKey);
    //
    //   try {
    //     const ethParams = new EthParticipateParams(7200,
    //       "0x27168cc578fcaf7e5b6324234b628233f255c91a", "0x6c4d7a11fb699bb020e46f315d8cb87ef2c0f8c8", "0.1",
    //       privKey);
    //     const result = await ethSwap.participate(ethParams);
    //     expect(result).toBeTruthy();
    //     // tslint:disable-next-line
    //     console.log("PARTICIPATE RESULT:", result);
    //   } catch (e) {
    //     expect(e.message).toEqual("Returned error: insufficient funds for gas * price + value");
    //   }
    // });
    //
    // it("Should pass redeem", async () => {
    //   expect.assertions(1);
    //   // tslint:disable-next-line
    //   const privKey = "tprv8ZgxMBicQKsPdxZqLMWLFLxJiYwSnP92WVXzkb3meDwix5n
    // QtNd21AHzn3UvmJAqEqGoYzR7vtZk8hrujhZVGBh1MMED8JnsNja8gEopYM";
    //
    //   const ethSwap = new EthWalletTestnet();
    //   const ks = ethSwap.recover(privKey);
    //   ethSwap.login(ks, privKey);
    //
    //   try {
    //     const ethParams = new EthRedeemParams("0xfb1c34b9de8a77c76a6f7a264b7b11f91d9cd2eca7b932b8e1144c74ac6dca63",
    //       "0xdb9b067ad0b7557dc260e68dfe639e9521eae5b8", null);
    //     const result = await ethSwap.redeem(ethParams);
    //     expect(result).toBeTruthy();
    //     // tslint:disable-next-line
    //     console.log("PARTICIPATE RESULT:", result);
    //   } catch (e) {
    //     expect(e.message).toEqual("Returned error: insufficient funds for gas * price + value");
    //   }
    // });
});
