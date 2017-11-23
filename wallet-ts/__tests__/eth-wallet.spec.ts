import "jest";
import {EthWallet} from "../src/eth/eth-wallet";

describe.skip("EthWallet", () => {
  it("Should be pass sanity", () => {
    expect(typeof EthWallet).toBe("function");
  });

  it("Should create new account", () => {
    const ethWallet = new EthWallet();
    expect(ethWallet.create("customPassword").wallet.privateKey).toBeTruthy();
  });

  it("Should be able to login", () => {
    const ethWallet = new EthWallet();
    const newAccount = ethWallet.create("customPassword");
    const address = newAccount.wallet.address;
    const store = newAccount.keystore;
    const accountRelogged = ethWallet.login(store, "customPassword");
    expect(accountRelogged.address).toEqual(address);
  });
});
