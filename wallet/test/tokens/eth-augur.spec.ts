// 7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000

import "jest";
import {AugurToken} from "../../src/eth-tokens/augur-testnet";

describe("EthAugurBalance", () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  it("Should pass sanity", () => {
    expect(typeof AugurToken).toBe("function");
  });

  it("Should pass Augur (ERC20) balanceOf", async () => {
    expect.assertions(1);

    const erc20Token = new AugurToken();

    const newAccount = erc20Token.createAccount("customPassword");
    const store = newAccount.keystore;
    erc20Token.login(store, "customPassword");

    try {
      const balance = await erc20Token.balanceOf("0x6c4d7a11fb699bb020e46f315d8cb87ef2c0f8c8");
      expect(balance).toEqual("500");
    } catch (e) {
      expect(e.message).toEqual(0);
    }
  });
});
