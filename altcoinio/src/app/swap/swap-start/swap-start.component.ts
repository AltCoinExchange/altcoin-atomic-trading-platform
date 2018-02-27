import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import * as sideA from "../../actions/side-A.action";
import * as swapAction from "../../actions/start.action";
import {flyInOutAnimation} from "../../animations/animations";
import {AnimationEnabledComponent} from "../../common/animation.component";
import {Coin, CoinFactory} from "../../models/coins/coin.model";
import {MessageTypes} from "../../models/message-types.enum";
import {Coins} from "../../models/coins/coins.enum";
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
  getTokenBalances,
} from "../../selectors/balance.selector";
import {GetBtcBalanceAction, GetEthBalanceAction, GetTokenBalanceAction} from "../../actions/balance.action";
import {getLinkGenerating, getLinkErrorMessage} from "../../selectors/side-a.selector";
import {Go} from "../../actions/router.action";

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
  coinTypes = Coins;
  disableOtherCoins: boolean;
  $swapProcess: Observable<SwapProcess>;
  $depositCoin: Observable<Coin>;
  $receiveCoin: Observable<Coin>;

  $quote: Observable<number>;
  $depositUSD: Observable<number>;
  $receiveUSD: Observable<number>;

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

    const $quotes = this.store.select(quoteSelector.getQuotes);

    this.$quote = Observable.combineLatest(
      this.$depositCoin, this.$receiveCoin, $quotes, (coin, receive, qq) => {
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
      this.$depositCoin, this.$receiveCoin, $quotes, (coin, receive, q) => {
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
      this.$quote, this.$receiveCoin, $quotes, (receiveCoinVal, receive, q) => {
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

    this.getTokenWalletRecords();
  }

  ngOnInit() {
  }

  swapDepositRecieveCoins() {
    this.store.dispatch(new swapAction.SwapDepositReceiveCoinsAction());
  }

  onSwap(data) {
    this.store.dispatch(new swapAction.setDepositCoinAction(data.depositCoin));
    this.store.dispatch(new swapAction.setReceiveCoinAction(data.receiveCoin));
    this.formFlyOut();
    setTimeout(() => {
      this.$depositCoin.subscribe(r => {
        const swapCoin = this.coins.find(coin => coin.name === r.name);
        if (+swapCoin.walletRecord.balance >= +r.amount) {
          this.store.dispatch(new sideA.GenerateLinkAction(data));
        } else {
          this.store.dispatch(new Go({
            path: ["/wallet"],
          }));
        }
      }).unsubscribe();
    }, 500);
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

  observeSelectedCoins() {
    const $disableOtherCoins = Observable.combineLatest(this.$depositCoin, this.$receiveCoin);
    $disableOtherCoins.subscribe(coins => {
      let fromCoin = coins[0];
      let toCoin = coins[1];
      let fromCoinCondition = !(fromCoin.type == this.coinTypes.BTC || fromCoin.type == this.coinTypes.ETH);
      let toCoinCondition = !(toCoin.type == this.coinTypes.BTC || toCoin.type == this.coinTypes.ETH);
      let selectedCoinCondition = !(this.selectedCoin.type === this.coinTypes.BTC || this.selectedCoin.type === this.coinTypes.ETH);
      this.disableOtherCoins = !(selectedCoinCondition || (!fromCoinCondition && !toCoinCondition));
    }).unsubscribe();
  }

  showAllCoins(coin) {

    this.selectedCoin = coin;
    this.observeSelectedCoins();

    const dialogRef = this.dialog.open(AllCoinsDialogComponent, {
      panelClass: "all-coins-dialog",
      data: {coins: this.coins, selectedCoin: coin, disableOtherCoins: this.disableOtherCoins }
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

  getTokenWalletRecords() {
    this.store.dispatch(new GetEthBalanceAction());
    this.store.dispatch(new GetBtcBalanceAction());
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.GOLEM, name: "GNT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.AUGUR, name: "REP"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ARAGON, name: "ANT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.BAT, name: "BAT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.EOS, name: "EOS"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.GNOSIS, name: "GNO"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.SALT, name: "SALT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.CIVIC, name: "CVC"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.OMISEGO, name: "OMG"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.DISTRICT0X, name: "DNT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.STATUSNETWORK, name: "SNT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.SUBSTRATUM, name: "SUB"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.TRON, name: "TRX"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.BYTOM, name: "BTM"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.DENT, name: "DENT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.POPULOUS, name: "PPT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.MAKER, name: "MKR"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.DIGIXDAO, name: "DGD"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.QASH, name: "QASH"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ETHOS, name: "ETHOS"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.FUNFAIR, name: "FUN"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ZEROX, name: "ZRX"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.REQUESTNETWORK, name: "REQ"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.BANCOR, name: "BNT"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ICONOMI, name: "ICN"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.TENXPAY, name: "PAY"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.STORJ, name: "STORJ"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ENJINCOIN, name: "ENJ"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.MONACO, name: "MCO"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.EDGELESS, name: "EDG"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.VECHAIN, name: "VEN"}));
    this.store.dispatch(new GetTokenBalanceAction({token: TOKENS.ICON, name: "ICX"}));

    this.coins.forEach((coin) => {
      switch (coin.name) {
        case "BTC":
          this.store.select(getBTCBalance).subscribe((walletRecord) => { coin.walletRecord = walletRecord; });
          break;
        case "ETH":
        this.store.select(getETHBalance).subscribe((walletRecord) => { coin.walletRecord = walletRecord; });
          break;
        default:
          this.store.select(getTokenBalances).subscribe((walletRecords) => {
            coin.walletRecord = walletRecords[coin.name];
          });
      }
      this.getTokenAmountUSD(coin);
    });
  }

  getTokenAmountUSD(coin) {
    const $quotes = this.store.select(quoteSelector.getQuotes);
    coin.$balanceUSD = Observable.combineLatest($quotes, (q) => {
      if (!q || !coin.walletRecord)
        return undefined;
      const balance = Number(coin.walletRecord.balance);
      const coinQuote = q.get(coin.name);
      const number = balance * coinQuote.price;
      const price = +number.toFixed(2);
      if (isNaN(number)) {
        return 0;
      }
      return price;
    });
  }

}
