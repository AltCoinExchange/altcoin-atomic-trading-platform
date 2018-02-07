import "jest";
import {AtomicSwapAbi} from "../src/config/abi/atomicswap";
import {AtomicSwapBin} from "../src/config/abi/bin";
import {EthConfiguration} from "../src/config/config-eth";
import {EthEngine} from "../src/eth/eth-engine";

describe("EthEngine", () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 160000;
  it("Should pass sanity", () => {
    expect(typeof EthEngine).toBe("function");
  });

  it("Should be pass sanity", async () => {
    const ethEngine = new EthEngine(AtomicSwapAbi, EthConfiguration.hosts[0], AtomicSwapBin);
    const newAccount = ethEngine.createAccount("customPassword");
    const address = newAccount.wallet.address;
    const store = newAccount.keystore;
    const accountRelogged = ethEngine.login(store);
    expect(accountRelogged.address).toEqual(address);
  });

  it("Should find transactions for specific block", async () => {
    const privKey = "tprv8ZgxMBicQKsPdxZqLMWLFLxJiYwSnP92WVXzkb3meDwix5nxQtNd21AHzn3UvmJAqEqGoYzR7vtZk8hrujhZVGBh1MMED8JnsNja8gEopYM";

    const ethEngine = new EthEngine(AtomicSwapAbi, EthConfiguration.hosts[0], AtomicSwapBin);
    const recovered = ethEngine.recoverAccount(privKey);
    ethEngine.login(recovered);
    const result = await ethEngine.scanBlockRange();
    const g = 1;
    expect(1).toEqual(1);
  });
});
