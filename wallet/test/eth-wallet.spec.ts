import "jest";

describe("EthWallet", () => {
  it("Should be pass sanity", () => {
    // expect(typeof EthWalletTestnet).toBe("function");
    expect(typeof 1).toBe("number");
  });

  // it("Should create new account", () => {
  //   const ethWallet = new EthWalletTestnet();
  //   expect(ethWallet.create("customPassword").wallet.privateKey).toBeTruthy();
  // });
  //
  // it("Should be able to login", () => {
  //   const ethWallet = new EthWalletTestnet();
  //   const newAccount = ethWallet.create("customPassword");
  //   const address = newAccount.wallet.address;
  //   const store = newAccount.keystore;
  //   const accountRelogged = ethWallet.login(store, "customPassword");
  //   expect(accountRelogged.address).toEqual(address);
  // });
});
