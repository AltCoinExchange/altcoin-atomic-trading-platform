import {ParticipateData} from "../../atomic-swap/participate-data";

export class EthParticipateData extends ParticipateData {
  constructor(public blockHash: string,
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
    super();
  }
}
