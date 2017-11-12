export class SwapsResponseModel {
  initTimestamp: number;
  refundTime: number;
  hashedSecret: string;
  secret: string;
  initiator: string;
  participant: string;
  value: number;
  emptied: boolean;
  state: number;
}
