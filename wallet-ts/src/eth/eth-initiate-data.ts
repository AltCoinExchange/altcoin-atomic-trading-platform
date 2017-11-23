import {InitiateData} from "../common/initiate-data";

export class EthInitiateData implements InitiateData {
  public secretHash: string;
  public secret: string;
  public neka: () => {};
}
