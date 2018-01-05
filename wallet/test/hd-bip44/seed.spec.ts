import {BitcoinBip44Wallet, EthBip44Wallet, generateMnemonic} from "../../src/hd-bip44/seed";

describe("BtcWallet", () => {
  it("Should be pass sanity", () => {
    expect(typeof generateMnemonic).toBe("function");
  });

  it("Should generate mnemonic seed", () => {
    expect(generateMnemonic().split(" ").length).toBe(12);
  });

  // it("Should create btc wallet", () => {
  //   const btcWallet =
  //     new BitcoinBip44Wallet("praise you muffin lion enable neck grocery crumble super myself license ghost");
  //   const address = btcWallet.generateNextExternal().getAddress();
  //   const address2 = btcWallet.generateNextExternal().getAddress();
  //
  //   expect(address).toBe("1PLDRLacEkAaaiWnfojVDb5hWpwXvKJrRa");
  //   expect(address2).toBe("1BAgzvv2gsUjx7owJeSFhtexQ97yWQFEZe");
  // });
  //
  // it("Should create eth wallet", () => {
  //   const ethWallet =
  //     new EthBip44Wallet("praise you muffin lion enable neck grocery crumble super myself license ghost");
  //   const WIF = ethWallet.generateNextExternal().keyPair.toWIF();
  //   console.log(WIF);
  // });
});
// bb81b66879591834bea174f24f26be35888ce36b - ETH
// mffBfAt1kaxkxpAWfSFv1h4eC9VdmXxfmL - BTC
