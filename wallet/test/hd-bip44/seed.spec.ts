import {generateMnemonic} from "../../src/hd-bip44/seed";

describe("BtcWallet", () => {
  it("Should be pass sanity", () => {
    expect(typeof generateMnemonic).toBe("function");
  });

  it("Should generate mnemonic seed", () => {
    expect(generateMnemonic().split(" ").length).toBe(12);
  });
});
