// 7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000

import "jest";
import {AugurToken} from "../../src/eth-tokens/augur-testnet";
import {SecretGenerator} from "../../src/common/hashing";
import {EthConfiguration} from "../../src/config/config-eth";
import {EthWalletTestnet} from "../../src/ethtestnet/eth-wallet-testnet";

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
      const balance = await erc20Token.balanceOf("0x96f86556909b3493e0c252dda93f25f125c85144");
      expect(balance).toEqual(0);
    } catch (e) {
      expect(e.message).toEqual(0);
    }
  });
});
