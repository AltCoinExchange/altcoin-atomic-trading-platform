import {Coin} from './coins/coin.model';

export interface SwapProcess {
  depositCoin: Coin;
  receiveCoin: Coin;
  activeStep: number;
}
