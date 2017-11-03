import {Coin} from './coin.model';

export interface SwapProcess {
  depositCoin: Coin;
  receiveCoin: Coin;
  submitAmount: boolean;
  showQRCode: boolean;
  showLink: boolean;
}
