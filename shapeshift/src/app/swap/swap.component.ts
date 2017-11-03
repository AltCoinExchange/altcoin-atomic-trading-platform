import {Component, OnInit} from '@angular/core';
import {Coin} from '../models/coin.model';
import {SwapProcess} from '../models/swap-process.model';
import {flyInOutAnimation} from '../animations/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'swap',
  styleUrls: ['./swap.component.css'],
  templateUrl: './swap.component.html',
  preserveWhitespaces: false,
  animations: [
    flyInOutAnimation,
  ],
})

export class SwapComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = {value: ''};
  /**
   * TypeScript public modifiers
   */

  eth: Coin = {
    name: 'ETH',
    amount: 0,
    animationSwapState: 'slideBack',
    icon: 'assets/icon/eth-icon.png',
    iconOutline: 'assets/icon/eth-icon-o.png',
  };

  btc: Coin = {
    name: 'BTC',
    amount: 0,
    animationSwapState: 'slideBack',
    icon: 'assets/icon/btc-icon.png',
    iconOutline: 'assets/icon/btc-icon-o.png',
  };

  swapProcess: SwapProcess = {
    depositCoin: this.eth,
    receiveCoin: this.btc,
    submitAmount: false,
    showQRCode: false,
    showLink: false,
  };

  firstSpinner = true;
  secondSpinner = true;

  constructor(private router: Router) {

  }

  doSubmit() {
    this.swapProcess.submitAmount = true;
  }

  firstAnimationDone(event) {
    if (event.toState === 'void') {
      this.swapProcess.showQRCode = true;
      this.router.navigate(['/insufficient-amount'])
      setTimeout(() => {
        this.firstSpinner = false;
        setTimeout(() => {
          this.swapProcess.showQRCode = false;
        }, 500);
      }, 2000);
    }
  }

  secondAnimationDone(event) {
    if (event.toState === 'void') {
      this.swapProcess.showLink = true;
      setTimeout(() => {
        this.secondSpinner = false;
      }, 2000);
    }


  }

  public ngOnInit() {
    console.log('hello `Swap` component');
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */
  }

}
