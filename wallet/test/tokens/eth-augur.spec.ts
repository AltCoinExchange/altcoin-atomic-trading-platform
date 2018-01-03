// 7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000
import "reflect-metadata";
import "jest";
import {AugurTokenTestnet} from "../../src/eth-tokens/augur";

describe("EthAugurBalance", () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    it("Should pass sanity", () => {
        expect(typeof AugurTokenTestnet).toBe("function");
    });

    // it("Should pass Augur (ERC20) balanceOf", async () => {
    //   expect.assertions(1);
    //
    //   const ethEngine = new EthEngine(null, AppConfig.EthConfiguration.hosts[0], null);
    //   const erc20Token = new AugurTokenTestnet(ethEngine);
    //
    //   const privKey =
    // "tprv8ZgxMBicQKsPdxZqLMWLFLxJiYwSnP92WVXzkb3meDwix5nxQtNd
    // 21AHzn3UvmJAqEqGoYzR7vtZk8hrujhZVGBh1MMED8JnsNja8gEopYM";
    //   const ks = ethEngine.recoverAccount(privKey);
    //   ethEngine.login(ks, privKey);
    //
    //   try {
    //     const balance = await erc20Token.balanceOf("0x6c4d7a11fb699bb020e46f315d8cb87ef2c0f8c8");
    //     const result =
    // await erc20Token.initiate(new EthInitiateParams(7200, "0x6c4d7a11fb699bb020e46f315d8cb87ef2c0f8c8", 1.0355473));
    //     expect(balance).toEqual("499");
    //   } catch (e) {
    //     expect(e.message).toEqual(0);
    //   }
    // });
});
