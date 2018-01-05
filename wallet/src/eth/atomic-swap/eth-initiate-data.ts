import {InitiateData} from "../../atomic-swap/initiate-data";

export class EthInitiateData extends InitiateData {
  constructor(public secret: string,
              public secretHash: string, public blockHash: string,
              public blockNumber: string,
              public contractAddress: string,
              public cumulativeGasUsed: string,
              public from: string,
              public gasUsed: string,
              public logsBloom: string,
              public status: string,
              public to: string,
              public transactionHash: string,
              public transactionIndex: string) {
    super(secret, secretHash);
  }
}
