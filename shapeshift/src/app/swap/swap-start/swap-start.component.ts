import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {flyInOutAnimation, fadeInAnimation} from '../../animations/animations';
import {Store} from '@ngrx/store';
import * as fromSwap from '../../reducers/start.reducer';
import * as swapSelector from '../../selectors/start.selector';
import * as quoteSelector from '../../selectors/quote.selector';
import * as swapAction from '../../actions/start.action';
import {Observable} from 'rxjs/Observable';
import {SwapProcess} from '../../models/swap-process.model';
import {Coin} from '../../models/coins/coin.model';
import {AnimationEnabledComponent} from '../../common/animation.component';
import { MessageTypes } from '../../models/message-types.enum';

@Component({
  selector: 'app-swap-start',
  templateUrl: './swap-start.component.html',
  styleUrls: ['./swap-start.component.scss'],
  animations: [flyInOutAnimation, fadeInAnimation],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwapStartComponent extends AnimationEnabledComponent implements OnInit {
  @HostBinding('class') classes = 'swap';

  firstSpinner = true;
  infoMsg : string;
  messageTypes: typeof MessageTypes = MessageTypes;

  $swapProcess: Observable<SwapProcess>;
  $depositCoin: Observable<Coin>;
  $receiveCoin: Observable<Coin>;

  $quote: Observable<number>;

  constructor(private router: Router, private store: Store<fromSwap.State>) {
    super();
    this.infoMsg = "FOR TESTNET USE ONLY";
    this.$swapProcess = this.store.select(swapSelector.getSwapProcess);
    this.$depositCoin = this.store.select(swapSelector.getDepositCoin);
    this.$receiveCoin = this.store.select(swapSelector.getReceiveCoin);

    const quotes = this.store.select(quoteSelector.getQuotes);

    this.$quote = Observable.combineLatest(
      this.$depositCoin, this.$receiveCoin, quotes, (coin, receive, quotes) => {
        if (!quotes) {
          return undefined;
        }
        const depositAmount = coin.amount;
        const depositQuotes = quotes.get(coin.name);
        const receiveQuotes = quotes.get(receive.name);

        let number = ((depositAmount * depositQuotes.price) / receiveQuotes.price);
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
      this.router.navigate(['/insufficient-amount']);
    }, 500);
  }

  swapDepositRecieveCoins() {
    this.store.dispatch(new swapAction.SwapDepositReceiveCoinsAction());
  }

  onSwap(data) {
    this.formFlyOut();
    setTimeout(() => {
      console.log(data);
      this.store.dispatch(new swapAction.StartSwapAction(data));
    }, 500);
  }

  onDepositChange(depositamount: number) {
    this.store.dispatch(new swapAction.SetDepositAmountAction(depositamount));
  }
}
