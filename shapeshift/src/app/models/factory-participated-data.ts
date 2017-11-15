export interface ParticipateData {
  redeemParams(initData): void;
}

export class ETHParticipateData implements ParticipateData {
  redeemParams = (initData) => {
    return {
      secret: '0x' + initData.secret,
      secretHash: '0x' + initData.secretHash,
      uuid: initData.uuid,
    };
  };

  constructor(private data) {

  }
}

export class BTCParticipateData implements ParticipateData {
  redeemParams = (initData) => {
    return {
      contractHex: this.data.contractHex,
      contractTxHex: this.data.contractTxHex,
      secret: initData.secret,
      uuid: initData.uuid,
    };
  };

  constructor(private data) {

  }
}

export class ParticipateDataFactory {
  public static createData(type: string, data): ParticipateData {
    if (type === "ETH") {
      return new ETHParticipateData(data);
    } else if (type === "BTC") {
      return new BTCParticipateData(data);
    }
    return null;
  }
}
