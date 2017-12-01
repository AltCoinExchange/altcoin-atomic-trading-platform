import {Transaction} from "bitcoinjs-lib";
import "jest";

describe("Simple Bitcoinjs Lib", () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  it("Should pass sanity", () => {
    // tslint:disable-next-line
    console.log(Transaction);
    expect(typeof Transaction).toBe("function");
  });
});
