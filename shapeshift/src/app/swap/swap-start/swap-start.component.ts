import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import * as sideA from "../../actions/side-A.action";
import * as swapAction from "../../actions/start.action";
import {fadeInAnimation, flyInOutAnimation} from "../../animations/animations";
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
  animations: [flyInOutAnimation, fadeInAnimation],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwapStartComponent extends AnimationEnabledComponent implements OnInit {
  infoMsg: string;
  messageTypes: typeof MessageTypes = MessageTypes;

  $swapProcess: Observable<SwapProcess>;
  $depositCoin: Observable<Coin>;
  $receiveCoin: Observable<Coin>;

  $quote: Observable<number>;

  constructor(private router: Router, private store: Store<fromSwap.State>) {
    super();

    this.store.dispatch(new swapAction.SetActiveStepAction(1));
    this.infoMsg = "For testnet use only";
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

  doSubmit() {
    this.formFlyOut();
    setTimeout(() => {
      this.router.navigate(["/insufficient-amount"]);
    }, 500);
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
}
