import {InitiateData} from "../common/initiate-data";
import {EthEngine} from "./eth-engine";
import {EthInitiateData} from "./eth-initiate-data";

export class EthAtomicSwap {
  public engine: EthEngine;

  constructor(abiConfiguration, private appConfiguration, bin) {
    this.engine = new EthEngine(abiConfiguration, appConfiguration, bin);
  }

  public async initiate(refundTime, secret, address, amount, extendedParams): InitiateData {
    const conversion = (extendedParams && extendedParams.conversion) ? extendedParams.conversion : "ether";

    const params = {
      ...extendedParams,
      from: this.appConfiguration.defaultWallet,
      value: this.engine.web3.utils.toWei(amount, conversion),
      conversion: undefined,
    };

    const initiateResult = await this.engine.callFunction("initiate", [refundTime, secret, address], params);

    console.log("initiateResult", initiateResult);

    const initiateData = new EthInitiateData();
    return initiateData;
  }
}
