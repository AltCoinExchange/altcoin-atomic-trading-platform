export class InformInitiatedDataModel {
  link: string;
  data: {
    secretHash: string,
    address: string,
    value: string,
  };

  get participateId() {
    return this.data.secretHash + this.data.address
  }


  constructor(link: string, data: { secretHash: string; address: string; value: string }) {
    this.link = link;
    this.data = data;
  }

  static newFrom(initiateData) {
    return new InformInitiatedDataModel(initiateData.id, initiateData.data);
  }
}
