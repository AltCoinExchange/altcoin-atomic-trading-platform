import {Coin} from './coins/coin.model';
import {SwapSpinners} from "./swap-spinners.enum";

export interface SwapProcess {
  depositCoin: Coin;
  receiveCoin: Coin;
  activeStep: number;
}
