import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {flyInOutAnimation} from '../../animations/animations';
import {Store} from '@ngrx/store';
import * as fromSwap from '../../reducers/start.reducer';
import * as swapSelector from '../../selectors/start.selector';
import * as swapAction from '../../actions/start.action';
import {Observable} from 'rxjs/Observable';
import {SwapProcess} from '../../models/swap-process.model';
import {Coin} from '../../models/coin.model';
import {AnimationEnabledComponent} from '../../common/animation.component';

@Component({
  selector: 'app-swap-start',
  templateUrl: './swap-start.component.html',
  styleUrls: ['./swap-start.component.scss'],
  animations: [flyInOutAnimation],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwapStartComponent extends AnimationEnabledComponent implements OnInit {
  @HostBinding('class') classes = 'swap';

  firstSpinner = true;

  $swapProcess: Observable<SwapProcess>;
  $depositCoin: Observable<Coin>;
  $receiveCoin: Observable<Coin>;

  constructor(private router: Router, private store: Store<fromSwap.State>) {
    super();
    this.$swapProcess = this.store.select(swapSelector.getSwapProcess);
    this.$depositCoin = this.store.select(swapSelector.getDepositCoin);
    this.$receiveCoin = this.store.select(swapSelector.getReceiveCoin);
  }

  ngOnInit() {
  }

  doSubmit() {
    this.state = 'void';
    setTimeout(() => {
      this.router.navigate(['/insufficient-amount']);
    }, 500);
  }

  swapDepositRecieveCoins() {
    this.store.dispatch(new swapAction.SwapDepositReceiveCoinsAction());
  }

  onSwap(depositCoin: Coin) {
    this.store.dispatch(new swapAction.StartSwapAction(depositCoin));
  }
}
