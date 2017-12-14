import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import * as sideA from "../../actions/side-A.action";
import * as swapAction from "../../actions/start.action";
import {flyInOutAnimation} from "../../animations/animations";
import {AnimationEnabledComponent} from "../../common/animation.component";
import {Coin} from "../../models/coins/coin.model";
import {MessageTypes} from "../../models/message-types.enum";
import {SwapProcess} from "../../models/swap-process.model";
import * as fromSwap from "../../reducers/start.reducer";
import * as quoteSelector from "../../selectors/quote.selector";
import * as swapSelector from "../../selectors/start.selector";

@Component({
  selector: "app-swap-start",
  templateUrl: "./swap-start.component.html",
  styleUrls: ["./swap-start.component.scss"],
  animations: [flyInOutAnimation],
  preserveWhitespaces: false
})
export class SwapStartComponent extends AnimationEnabledComponent implements OnInit {
  scrollbarConfig: Object = { suppressScrollY: true };
  infoMsg: string;
  messageTypes: typeof MessageTypes = MessageTypes;
  chooseCoins: boolean = false;
  selectedCoin: Coin;
  coins: Array<String>;
  $swapProcess: Observable<SwapProcess>;
  $depositCoin: Observable<Coin>;
  $receiveCoin: Observable<Coin>;

  $quote: Observable<number>;

  constructor(private router: Router, private store: Store<fromSwap.State>) {
    super();
    this.infoMsg = "For testnet use only";
    this.coins = [
      'assets/icon/eth-icon-o.png', 
      'assets/icon/btc-icon-o.png', 
      'assets/icon/ltc-icon-o.png', 
      'assets/icon/dcr-icon-o.png', 
      'assets/icon/rep-icon-o.png', 
      'assets/icon/gnt-icon-o.png', 
      'assets/icon/gno-icon-o.png',
      'assets/icon/bat-icon-o.png',
      'assets/icon/ant-icon-o.png',
      'assets/icon/eos-icon-o.png',
      'assets/icon/salt-icon-o.png'
    ];
  
    this.store.dispatch(new swapAction.SetActiveStepAction(1));
    this.$swapProcess = this.store.select(swapSelector.getSwapProcess);
    this.$depositCoin = this.store.select(swapSelector.getDepositCoin);
    this.$receiveCoin = this.store.select(swapSelector.getReceiveCoin);

    const quotes = this.store.select(quoteSelector.getQuotes);

    this.$quote = Observable.combineLatest(
      this.$depositCoin, this.$receiveCoin, quotes, (coin, receive, q) => {
        if (!q) {
          return undefined;
        }
        const depositAmount = coin.amount;
        const depositQuotes = q.get(coin.name);
        const receiveQuotes = q.get(receive.name);
        console.log('deposit amount', depositAmount, 'deposit quote', depositQuotes, 'receive quotes', receiveQuotes);
        const number = ((depositAmount * depositQuotes.price) / receiveQuotes.price);
        const price = +number.toFixed(8);
        if (isNaN(number)) {
          return 0;
        }
        return price;
      },
    );
  }

  ngOnInit() {
  }


  swapDepositRecieveCoins() {
    this.store.dispatch(new swapAction.SwapDepositReceiveCoinsAction());
  }

  onSwap(data) {
    this.formFlyOut();
    setTimeout(() => {
      this.store.dispatch(new sideA.GenerateLinkAction(data));
    }, 500);
  }

  onDepositChange(depositamount: number) {
    this.store.dispatch(new swapAction.SetDepositAmountAction(depositamount));
  }

  toggleCoinStrip(coin: Coin){
    this.selectedCoin = coin;
    this.chooseCoins = !this.chooseCoins;
  }

  closeCoinStrip(event, coinImg){
    event.stopPropagation();
    event.preventDefault();
    this.chooseCoins = false;
  }
}
