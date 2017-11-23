import {InitiateParams} from "./initiate-params";
import {InitiateData} from "./initiate-data";

export interface IAtomicSwap {
  initiate(params: InitiateParams): Promise<InitiateData>;
}
