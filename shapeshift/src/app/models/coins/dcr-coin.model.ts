import {Coin} from './coin.model';
import {Coins} from './coins.enum';
import * as wallet from 'wallet';
import {DcrWalletModel} from '../wallets/dcr-wallet.model';
import {ContractResponseModel} from '../responses/contract-response.model';
import {Observable} from 'rxjs/Observable';
import {ShapeshiftStorage} from '../../common/shapeshift-storage';
import {SwapsResponseModel} from '../responses/swaps-response.model';

export class DcrCoinModel implements Coin {
  readonly timeout: number = 7200;
  readonly name: string = Coins[Coins.ETH].toString();
  // TODO: Add decred icon
  readonly icon: string = 'assets/icon/eth-icon.png';
  readonly iconOutline: string = 'assets/icon/eth-icon-o.png';
  readonly fullName: string = 'Decred';
  amount: number;

  generateNewAddress(ethWallet: DcrWalletModel) {
    throw new Error("Method not implemented.");
  }

  getBalance(address: string) {
    throw new Error("Method not implemented.");
  }

  update(coin: Coin): Coin {
    throw new Error("Method not implemented.");
  }

  extractSecret(data) {
    throw new Error("Method not implemented.");
  }

  initiate(address: string): Observable<ContractResponseModel> {
    throw new Error("Method not implemented.");
  }

  participate(address: string, secretHash: string): any {
    throw new Error("Method not implemented.");
  }

  redeem(data){
    throw new Error("Method not implemented.");
  }

  refund(hashedSecret: string): any {
    throw new Error("Method not implemented.");
  }
}
