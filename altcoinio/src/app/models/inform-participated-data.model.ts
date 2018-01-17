export class InformParticipatedDataModel {
  id: string;
  data: any;


  constructor(id: string, data: any, coin: string) {
    this.id = id;
    this.data = data;
    this.data.coin = coin;
  }
}
