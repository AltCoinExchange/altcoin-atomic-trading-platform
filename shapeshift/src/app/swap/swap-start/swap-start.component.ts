import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import * as sideA from "../../actions/side-A.action";
import * as swapAction from "../../actions/start.action";
import {flyInOutAnimation} from "../../animations/animations";
import {AnimationEnabledComponent} from "../../common/animation.component";
import {Coin, CoinFactory} from "../../models/coins/coin.model";
import {MessageTypes} from "../../models/message-types.enum";
import {SwapProcess} from "../../models/swap-process.model";
import * as quoteSelector from "../../selectors/quote.selector";
import * as swapSelector from "../../selectors/start.selector";
import {MatDialog} from "@angular/material";
import {AllCoinsDialogComponent} from "../../common/coins-dialog/all-coins.dialog";
import {AppState} from "../../reducers/app.state";
import {Observable} from "rxjs/Observable";
import {WalletRecord} from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {
  getBTCBalance,
  getETHBalance,
  getTokenBalanceAragon,
  getTokenBalanceAugur,
  getTokenBalanceBat,
  getTokenBalanceBytom,
  getTokenBalanceCivic,
  getTokenBalanceDent,
  getTokenBalanceDistrict0x,
  getTokenBalanceEos,
  getTokenBalanceGnosis,
  getTokenBalanceGolem,
  getTokenBalanceOmiseGo,
  getTokenBalances,
  getTokenBalanceSalt,
  getTokenBalanceStatusNetwork,
  getTokenBalanceSubstratum,
  getTokenBalanceTron
} from "../../selectors/balance.selector";
import {GetBtcBalanceAction, GetEthBalanceAction, GetTokenBalanceAction} from "../../actions/balance.action";
import {getLinkGenerating, getLinkErrorMessage} from "../../selectors/side-a.selector";

@Component({
  selector: "app-swap-start",
  templateUrl: "./swap-start.component.html",
  styleUrls: ["./swap-start.component.scss"],
  animations: [flyInOutAnimation],
  preserveWhitespaces: false
})
export class SwapStartComponent extends AnimationEnabledComponent implements OnInit {
  scrollbarConfig: Object = {suppressScrollY: true};
  infoMsg: string;
  messageTypes: typeof MessageTypes = MessageTypes;
  selectedCoin: Coin;
  coinToChange: string;
  coins: Array<Coin>;
  $swapProcess: Observable<SwapProcess>;
  $depositCoin: Observable<Coin>;
  $receiveCoin: Observable<Coin>;

  $quote: Observable<number>;
  $depositUSD: Observable<number>;
  $receiveUSD: Observable<number>;
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

  $generatingLinkIndicator: Observable<boolean> = this.store.select(getLinkGenerating);
  $generatingLinkErrorMessage: Observable<string> = this.store.select(getLinkErrorMessage);

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    super();
    this.infoMsg = "For testnet coins only. Do not send real Bitcoin or Ethereum.";
    this.coins = CoinFactory.createAllCoins();

    this.store.dispatch(new swapAction.SetActiveStepAction(1));
    this.$swapProcess = this.store.select(swapSelector.getSwapProcess);
    this.$depositCoin = this.store.select(swapSelector.getDepositCoin);
    this.$receiveCoin = this.store.select(swapSelector.getReceiveCoin);

    const quotes = this.store.select(quoteSelector.getQuotes);

    this.$quote = Observable.combineLatest(
      this.$depositCoin, this.$receiveCoin, quotes, (coin, receive, qq) => {
        if (!qq) {
          return undefined;
        }

        const depositAmount = +coin.amount;
        const depositQuotes = qq.get(coin.name);
        const receiveQuotes = qq.get(receive.name);

        const number = ((depositAmount * depositQuotes.price) / receiveQuotes.price);
        const price = +number.toFixed(8);
        if (isNaN(number)) {
          return 0;
        }
        return price;
      }
    );

    this.$depositUSD = Observable.combineLatest(
      this.$depositCoin, this.$receiveCoin, quotes, (coin, receive, q) => {
        if (!q) {
          return undefined;
        }
        const depositAmount = coin.amount;
        const depositQuotes = q.get(coin.name);
        // console.log('deposit quotes', depositQuotes);
        const number = depositAmount * depositQuotes.price;
        const price = +number.toFixed(2);
        if (isNaN(number)) {
          return 0;
        }
        return price;
      }
    );

    // mock receive usd value with 1% fee
    this.$receiveUSD = Observable.combineLatest(
      this.$quote, this.$receiveCoin, quotes, (receiveCoinVal, receive, q) => {
        if (!q) {
          return undefined;
        }

        const depositAmount = receiveCoinVal;
        const depositQuotes = q.get(receive.name);

        let number = depositAmount * depositQuotes.price;
        number = number - (0.01 * number); // TODO artifical fee ??
        const price = +number.toFixed(2);
        if (isNaN(number)) {
          return 0;
        }
        return price;
      }
    );

    this.getTokenBalances();
    this.getTokenAmountUSD();
  }

  ngOnInit() {
  }

  swapDepositRecieveCoins() {
    this.store.dispatch(new swapAction.SwapDepositReceiveCoinsAction());
  }

  onSwap(data) {
    this.store.dispatch(new sideA.GenerateLinkAction(data));
  }

  onDepositChange(depositamount: number) {
    this.store.dispatch(new swapAction.SetDepositAmountAction(depositamount));
  }

  changeDepositCoin(coin: Coin) {
    this.showAllCoins(coin);
    this.coinToChange = "deposit";
  }

  changeReceiveCoin(coin: Coin) {
    this.showAllCoins(coin);
    this.coinToChange = "receive";
  }

  showAllCoins(coin) {
    const dialogRef = this.dialog.open(AllCoinsDialogComponent, {
      panelClass: "all-coins-dialog",
      data: {coins: this.coins, selectedCoin: coin}
    });

    dialogRef.afterClosed().filter(res => !!res).subscribe(result => {
      if (result.amount === 0) {
        setTimeout(() => {
          this.chooseCoin(result);
        });
        return;
      }
      this.chooseCoin(result);
    });
  }

  chooseCoin(coin) {
    if (this.coinToChange == "deposit")
      this.store.dispatch(new swapAction.setDepositCoinAction(coin));
    else
      this.store.dispatch(new swapAction.setReceiveCoinAction(coin));
  }

  getTokenBalances() {

    this.store.dispatch(new GetEthBalanceAction());
    this.store.dispatch(new GetBtcBalanceAction());
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.GOLEM, name: "golem"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.AUGUR, name: "augur"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ARAGON, name: "aragon"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.BAT, name: "bat"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.EOS, name: "eos"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.GNOSIS, name: "gnosis"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.SALT, name: "salt"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.CIVIC, name: "civic"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.OMISEGO, name: "omisego"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.DISTRICT0X, name: "district0x"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.STATUSNETWORK, name: "statusnetwork"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.SUBSTRATUM, name: "substratum"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.TRON, name: "tron"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.BYTOM, name: "bytom"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.DENT, name: "dent"}));

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
    //console.log(tokenBalances); // todo can be done better

    this.coins.forEach((coin) => {
      switch (coin.name) {
        case "BTC":
          coin.$balance = this.$btcBalance;
          this.selectedCoin = coin;
          break;
        case "ETH":
          coin.$balance = this.$ethBalance;
          break;
        case "REP":
          coin.$balance = this.$tokenBalanceAugur;
          break;
        case "GNT":
          coin.$balance = this.$tokenBalanceGolem;
          break;
        case "GNO":
          coin.$balance = this.$tokenBalanceGnosis;
          break;
        case "BAT":
          coin.$balance = this.$tokenBalanceBat;
          break;
        case "ANT":
          coin.$balance = this.$tokenBalanceAragon;
          break;
        case "EOS":
          coin.$balance = this.$tokenBalanceEos;
          break;
        case "SALT":
          coin.$balance = this.$tokenBalanceSalt;
          break;
        case "CVC":
          coin.$balance = this.$tokenBalanceCivic;
          break;
        case "OMG":
          coin.$balance = this.$tokenBalanceOmiseGo;
          break;
        case "DNT":
          coin.$balance = this.$tokenBalanceDistrict0x;
          break;
        case "SNT":
          coin.$balance = this.$tokenBalanceStatusNetwork;
          break;
        case "SUB":
          coin.$balance = this.$tokenBalanceSubstratum;
          break;
        case "TRN":
          coin.$balance = this.$tokenBalanceTron;
          break;
        case "BTM":
          coin.$balance = this.$tokenBalanceBytom;
          break;
        case "DENT":
          coin.$balance = this.$tokenBalanceDent;
          break;
        default:
          coin.$balance = this.$tokenBalanceDent;
      }

    });
  }

  getTokenAmountUSD() {
    const quotes = this.store.select(quoteSelector.getQuotes);
    this.coins.forEach((coin) => {
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
  }

}
