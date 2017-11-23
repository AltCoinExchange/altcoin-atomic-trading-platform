import "jest";
import {EthWallet} from "../src/eth/eth-wallet";

describe("EthWallet", () => {
  it("Should be pass sanity", () => {
    expect(typeof EthWallet).toBe("function");
  });

  it("Should create new account", () => {
    const ethWallet = new EthWallet();
    expect(ethWallet.create("customPassword").wallet.privateKey).toBeTruthy();
  });
});
