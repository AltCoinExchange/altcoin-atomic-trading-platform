import {Coins} from "./coins.enum";

export abstract class Coin {
  readonly type: Coins;
  readonly name: string;
  readonly icon: string;
  readonly iconOutline: string;
  readonly fullName: string;
  amount: number;

}
