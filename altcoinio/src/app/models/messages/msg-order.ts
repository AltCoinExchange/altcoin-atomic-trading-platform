import {MsgBase} from "./msg-base";

export interface MsgOrderData {
  id: string;
  address: string;
  from: string;
  to: string;
  fromAmount: number;
  toAmount: number;
}

export class MsgOrder implements MsgBase {
  type: string = "setOrder";
  data: MsgOrderData;

  public constructor(id: string, address: string, from: string, to: string, fromAmount: number, toAmount: number) {
    this.data = {} as MsgOrderData;
    this.data.id = id;
    this.data.address = address;
    this.data.from = from;
    this.data.to = to;
    this.data.fromAmount = fromAmount;
    this.data.toAmount = toAmount;
  }

  public toJson() : string {
    return JSON.stringify(this);
  }
}
