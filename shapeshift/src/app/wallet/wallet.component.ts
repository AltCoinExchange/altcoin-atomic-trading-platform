import { Component, OnInit, Renderer2, ViewChild, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TOKENS } from 'altcoinio-wallet';
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
  getTokenBalanceBat, getTokenBalanceBytom, getTokenBalanceCivic, getTokenBalanceDent, getTokenBalanceDistrict0x,
  getTokenBalanceEos,
  getTokenBalanceGnosis,
  getTokenBalanceGolem, getTokenBalanceOmiseGo, getTokenBalances,
  getTokenBalanceSalt, getTokenBalanceStatusNetwork, getTokenBalanceSubstratum, getTokenBalanceTron
} from '../selectors/balance.selector';
import * as quoteSelector from '../selectors/quote.selector';
import { AllCoinsDialogComponent } from './all-coins.dialog';
import { WalletOptions } from './wallet-options.enum';

declare const QRCode;

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
  $tokenBalanceCivic: Observable<WalletRecord>;
  $tokenBalanceDistrict0x: Observable<WalletRecord>;
  $tokenBalanceStatusNetwork: Observable<WalletRecord>;
  $tokenBalanceSubstratum: Observable<WalletRecord>;
  $tokenBalanceTron: Observable<WalletRecord>;
  $tokenBalanceBytom: Observable<WalletRecord>;
  $tokenBalanceDent: Observable<WalletRecord>;
  $tokenBalanceOmiseGo: Observable<WalletRecord>;
  $ethBalance: Observable<WalletRecord>;
  $btcBalance: Observable<WalletRecord>;
  randomValue: number = 0.001;
  elementType: 'url';
  value: string = 'Techiediaries';

  filteredCoins: Array<Coin>;
  search;

  inMyPossesion: boolean = localStorage.getItem('show_posession') ? localStorage.getItem('show_posession') === 'true' : false;
  qr;

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

    this.$tokenBalanceCivic = this.store.select(getTokenBalanceCivic);
    this.$tokenBalanceOmiseGo = this.store.select(getTokenBalanceOmiseGo);
    this.$tokenBalanceDistrict0x = this.store.select(getTokenBalanceDistrict0x);
    this.$tokenBalanceStatusNetwork = this.store.select(getTokenBalanceStatusNetwork);
    this.$tokenBalanceSubstratum = this.store.select(getTokenBalanceSubstratum);
    this.$tokenBalanceTron = this.store.select(getTokenBalanceTron);
    this.$tokenBalanceBytom = this.store.select(getTokenBalanceBytom);
    this.$tokenBalanceDent = this.store.select(getTokenBalanceDent);

    const tokenBalances = this.store.select(getTokenBalances);
    console.log(tokenBalances); // todo can be done better

    this.allCoins = CoinFactory.createAllCoins();
    this.allCoins.forEach((coin) => {
      switch (coin.name) {
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
        case 'CVC':
          coin.$balance = this.$tokenBalanceCivic;
          break;
        case 'OMG':
          coin.$balance = this.$tokenBalanceOmiseGo;
          break;
        case 'DNT':
          coin.$balance = this.$tokenBalanceDistrict0x;
          break;
        case 'SNT':
          coin.$balance = this.$tokenBalanceStatusNetwork;
          break;
        case 'SUB':
          coin.$balance = this.$tokenBalanceSubstratum;
          break;
        case 'TRN':
          coin.$balance = this.$tokenBalanceTron;
          break;
        case 'BTM':
          coin.$balance = this.$tokenBalanceBytom;
          break;
        case 'DENT':
          coin.$balance = this.$tokenBalanceDent;
          break;
        default:
          coin.$balance = this.$tokenBalanceDent;
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
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.CIVIC, name: 'civic'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.OMISEGO, name: 'omisego'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.DISTRICT0X, name: 'district0x'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.STATUSNETWORK, name: 'statusnetwork'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.SUBSTRATUM, name: 'substratum'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.TRON, name: 'tron'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.BYTOM, name: 'bytom'}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.DENT, name: 'dent'}));
  }

  ngAfterViewInit() {
    this.selectedCoin.$balance.filter(b => b.loading === false).first().subscribe((b) => {
      this.generateQrCode(this.selectedCoin);
    });
  }

  copyReceiveAddress(event) {
    const copyText = <HTMLInputElement>document.getElementById('coinAddress');
    copyText.select();
    document.execCommand('Copy');
  }

  selectWalletOption(walletOption) {
    this.selectedOption = undefined;
    setTimeout(() =>{
      this.selectedOption = walletOption;
    }, 500);
  }

  selectCoinCard(coin) {
    this.selectedCoin = coin;
    const coinEl = document.querySelector('#' + coin.name);
    const perfectNativeElement = this.perfectScrollbar.elementRef.nativeElement;
    perfectNativeElement.scrollLeft = (<any>coinEl).offsetLeft - 20;
    this.generateQrCode(coin);
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

    dialogRef.afterClosed().filter(res => !!res).subscribe(result => {
      if (result.amount === 0) {
        this.inMyPossesion = false;
        setTimeout(() => {
          this.selectCoinCard(result);
        });
        return;
      }
      this.selectCoinCard(result);
    });
  }

  onPossesionModeChange(val: boolean) {
    localStorage.setItem('show_posession', JSON.stringify(val));
    this.inMyPossesion = val;
  }

  private generateQrCode(coin) {
    const address = Observable.combineLatest(coin.$balance, this.$ethBalance, (c: any, eth) => {
      let addr;
      if (c.address) {
        addr = c.address;
      } else {
        addr = eth.address;
      }
      return addr;
    });

    address.first().subscribe(addr => {
      if (!this.qr) {
        this.qr = new QRCode(document.getElementById('qrcode'), {
          text: addr,
          width: 200,
          height: 200,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });
      }
      this.qr.makeCode(addr);
    }).unsubscribe();
  }

  wheelOverHorizontallDiv(e){
    const perfectNativeElement = this.perfectScrollbar.elementRef.nativeElement;
    perfectNativeElement.scrollLeft -= (e.wheelDelta);
    e.preventDefault();
  }
}
