import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {flyInOutAnimation} from '../../animations/animations';
import {Store} from '@ngrx/store';
import * as fromSwap from '../../reducers/swap.reducer';
import * as swapSelector from '../../selectors/swap.selector';
import * as swapAction from '../../actions/swap.action';
import {Observable} from 'rxjs/Observable';
import {SwapProcess} from '../../models/swap-process.model';
import {Coin} from '../../models/coin.model';

// TODO
// this is not swap-initiate :( more likely this is swap-start

@Component({
  selector: 'app-swap-initiate',
  templateUrl: './swap-initiate.component.html',
  styleUrls: ['./swap-initiate.component.scss'],
  animations: [flyInOutAnimation],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwapInitiateComponent implements OnInit {
  @HostBinding('@flyInOut') state = 'in';
  @HostBinding('style.display') display = 'block';
  @HostBinding('class') classes = 'swap';

  firstSpinner = true;

  $swapProcess: Observable<SwapProcess>;
  $depositCoin: Observable<Coin>;
  $receiveCoin: Observable<Coin>;

  constructor(private router: Router, private store: Store<fromSwap.State>) {
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
