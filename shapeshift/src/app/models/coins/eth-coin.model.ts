import {Coin} from './coin.model';
import {Coins} from './coins.enum';
import * as wallet from 'wallet';
import {EthWalletModel} from '../wallets/eth-wallet.model';

export class EthCoinModel implements Coin {
  readonly name: string = Coins[Coins.ETH].toString();
  readonly icon: string = 'assets/icon/eth-icon.png';
  readonly iconOutline: string = 'assets/icon/eth-icon-o.png';
  amount: number;

  generateNewAddress(ethWallet: EthWalletModel) {
    const eth = new wallet.Wallet.Ethereum.EthWallet();
    const acc = eth.create(ethWallet.privateKey);

    // const derivedPrivKey = btc.deriveHdPrivateKey(1); //TODO this also needs to be autoincremental
    // const hdPublicKey = derivedPrivKey.hdPublicKey;
    // const address = btc.generateAddress(hdPublicKey);
    return acc.wallet.address.toString();
  }

  update(coin: Coin): Coin {
    const model = new EthCoinModel();
    model.amount = coin.amount;
    return model;
  }
}
