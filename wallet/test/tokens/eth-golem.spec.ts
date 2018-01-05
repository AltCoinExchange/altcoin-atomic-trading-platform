// 7200, "0x" + secret.hashedSecret, AppConfig.hosts[1].defaultWallet, 10, 2000000
import "reflect-metadata";
import "jest";
import {AugurTokenTestnet} from "../../src/eth-tokens/augur";
import {GolemTokenTestnet} from "../../src/eth-tokens/golem";
import {TokenFactory, TOKENS} from "../../src/eth-tokens/token-factory";
import {EthEngine} from "../../src/eth/eth-engine";
import * as AppConfig from "../../src/config/config-eth";


describe("EthGolemBalance", () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  it("Should pass sanity", () => {
    expect(typeof GolemTokenTestnet).toBe("function");
  });

  // it("Should pass Golem (ERC20) balanceOf", async () => {
  //   expect.assertions(1);
  //
  //   const ethEngine = new EthEngine(null, AppConfig.EthConfiguration.hosts[0], null);
  //   const erc20Token = TokenFactory.GetToken(TOKENS.GOLEM, ethEngine);
  //
  //   const newAccount = ethEngine.createAccount("customPassword");
  //   const store = newAccount.keystore;
  //   ethEngine.login(store, "customPassword");
  //
  //   try {
  //     const balance = await erc20Token.balanceOf("0x6c4d7a11fb699bb020e46f315d8cb87ef2c0f8c8");
  //     expect(balance).toEqual("0");
  //   } catch (e) {
  //     expect(e.message).toEqual(0);
  //   }
  // });
});
