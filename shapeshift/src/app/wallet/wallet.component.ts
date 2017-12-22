import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TOKENS } from '../../../../wallet/src/eth-tokens/token-factory';
import { GetBtcBalanceAction, GetEthBalanceAction, GetTokenBalanceAction } from '../actions/balance.action';
import { fadeInOutAnimation, scaleInOutAnimation } from '../animations/animations';
import { Coin, CoinFactory } from '../models/coins/coin.model';
import { MessageTypes } from '../models/message-types.enum';
import { AppState } from '../reducers/app.state';
import { WalletRecord } from '../reducers/balance.reducer';
import {
  getBTCBalance,
  getETHBalance,
  getTokenBalanceAragon,
  getTokenBalanceAugur,
  getTokenBalanceBat,
  getTokenBalanceEos,
  getTokenBalanceGnosis,
  getTokenBalanceGolem,
  getTokenBalanceSalt
} from '../selectors/balance.selector';
import * as quoteSelector from '../selectors/quote.selector';
import { AllCoinsDialogComponent } from './all-coins.dialog';
import { WalletOptions } from './wallet-options.enum';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  animations: [scaleInOutAnimation, fadeInOutAnimation]
})
export class WalletComponent implements OnInit {
  @ViewChild('perfectScrollbar') perfectScrollbar;

  scaleInOut = 'scaleInOut';
  fadeInOut = 'fadeInOut';
  infoMsg: string;
  messageTypes: typeof MessageTypes = MessageTypes;
  walletOptions: typeof WalletOptions = WalletOptions;
  allCoins: Array<Coin>;
  selectedCoin: Coin;
  selectedOption: WalletOptions = WalletOptions.Receive;
  sendAmount: Number = 0.00;
  $tokenBalanceAugur: Observable<WalletRecord>;
  $tokenBalanceGolem: Observable<WalletRecord>;
  $tokenBalanceAragon: Observable<WalletRecord>;
  $tokenBalanceEos: Observable<WalletRecord>;
  $tokenBalanceSalt: Observable<WalletRecord>;
  $tokenBalanceBat: Observable<WalletRecord>;
  $tokenBalanceGnosis: Observable<WalletRecord>;
  $ethBalance: Observable<WalletRecord>;
  $btcBalance: Observable<WalletRecord>;
  randomValue: number = 0.001;
  elementType: 'url';
  value: string = 'Techiediaries';

  filteredCoins: Array<Coin>;
  search;

  constructor(private store: Store<AppState>, public dialog: MatDialog, private renderer: Renderer2) {
    this.infoMsg = 'This wallet is to be used for testnet coins only. Do not send real Bitcoin or Ethereum to these addresses.';
    const quotes = this.store.select(quoteSelector.getQuotes);

    this.$ethBalance = this.store.select(getETHBalance);
    this.$btcBalance = this.store.select(getBTCBalance);
    this.$tokenBalanceAugur = this.store.select(getTokenBalanceAugur);
    this.$tokenBalanceGolem = this.store.select(getTokenBalanceGolem);
    this.$tokenBalanceAragon = this.store.select(getTokenBalanceAragon);
    this.$tokenBalanceBat = this.store.select(getTokenBalanceBat);
    this.$tokenBalanceEos = this.store.select(getTokenBalanceEos);
    this.$tokenBalanceGnosis = this.store.select(getTokenBalanceGnosis);
    this.$tokenBalanceSalt = this.store.select(getTokenBalanceSalt);

    this.allCoins = CoinFactory.createAllCoins();
    this.allCoins.forEach((coin) => {
      switch(coin.name){
        case 'BTC':
          coin.$balance = this.$btcBalance;
          this.selectedCoin = coin;
          break;
        case 'ETH':
          coin.$balance = this.$ethBalance;
          break;
        case 'REP':
          coin.$balance = this.$tokenBalanceAugur;
          break;
        case 'GNT':
          coin.$balance = this.$tokenBalanceGolem;
          break;
        case 'GNO':
          coin.$balance = this.$tokenBalanceGnosis;
          break;
        case 'BAT':
          coin.$balance = this.$tokenBalanceBat;
          break;
        case 'ANT':
          coin.$balance = this.$tokenBalanceAragon;
          break;
        case 'EOS':
          coin.$balance = this.$tokenBalanceEos;
          break;
        case 'SALT':
          coin.$balance = this.$tokenBalanceSalt;
          break;
        default:
          coin.$balance = this.$tokenBalanceSalt;
      }

    });

    this.allCoins.forEach((coin) => {
      coin.$amountUSD = Observable.combineLatest(quotes, coin.$balance, (q, coinBalance) => {
        if (!q || !coinBalance)
          return undefined;
        const balance = Number(coinBalance.balance);
        const coinQuote = q.get(coin.name);
        const number = balance * coinQuote.price;
        const price = +number.toFixed(2);
        if (isNaN(number)) {
          return 0;
        }
        return price;
      });
    });

    this.filteredCoins = [...this.allCoins];
  }

  ngOnInit() {
    this.store.dispatch(new GetEthBalanceAction());
    this.store.dispatch(new GetBtcBalanceAction());
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.GOLEM, name: 'golem'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.AUGUR, name: 'augur'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ARAGON, name: 'aragon'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.BAT, name: 'bat'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.EOS, name: 'eos'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.GNOSIS, name: 'gnosis'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.SALT, name: 'salt'}));

  }

  copyEthAddress(event) {
    const copyText = <HTMLInputElement>document.getElementById('ethAddress');
    copyText.select();
    document.execCommand('Copy');
  }

  copyBtcAddress(event) {
    const copyText = <HTMLInputElement>document.getElementById('btcAddress');
    copyText.select();
    document.execCommand('Copy');
  }

  selectWalletOption(walletOption) {
    this.selectedOption = walletOption;
  }

  selectCoinCard(coin) {
    this.selectedCoin = coin;

    const coinEl = document.querySelector('#' + coin.name);
    const perfectNativeElement = this.perfectScrollbar.elementRef.nativeElement;
    // perfectNativeElement.scrollTo(coinEl.getBoundingClientRect().left + perfectNativeElement.scrollHeight, 0);
    perfectNativeElement.scrollLeft = (<any>coinEl).offsetLeft;
  }

  filterCoin(val: string) {
    this.filteredCoins = [...this.allCoins].filter(coin => {
      return coin.name.toLowerCase().indexOf(val.toLowerCase()) !== -1 ||
        val.toLowerCase().indexOf(coin.name.toLowerCase()) !== -1 ||
        coin.fullName.toLowerCase().indexOf(val) !== -1;
    });
  }

  showAllCoins() {
    const dialogRef = this.dialog.open(AllCoinsDialogComponent, {
      panelClass: 'allCoinsDialog',
      data: {coins: this.allCoins}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectCoinCard(result);
    });
  }
}
