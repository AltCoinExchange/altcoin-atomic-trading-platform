export interface InformInitiatedDataModel {
  link: string;
  data: {
    secretHash: string,
    address: string,
    value: string,
  };
}
