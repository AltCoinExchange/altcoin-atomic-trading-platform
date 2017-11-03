import {Component, OnInit} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {Coin} from '../models/coin.model';
import {SwapProcess} from '../models/swap-process.model';

@Component({
  selector: 'swap',
  providers: [],
  styleUrls: ['./swap.component.css'],
  templateUrl: './swap.component.html',

  preserveWhitespaces: false,
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => in', [
        animate(500, keyframes([
          style({opacity: 0, transform: 'translateY(100%)'}),
          style({opacity: 0.5, transform: 'translateY(50%)'}),
          style({opacity: 1, transform: 'translateY(0)'}),
        ])),
      ]),
      transition('in => void', [
        animate(500, keyframes([
          style({opacity: 1, transform: 'translateY(0)'}),
          style({opacity: 0.5, transform: 'translateY(-50%)'}),
          style({opacity: 0, transform: 'translateY(-100%)'}),
        ])),
      ]),
    ]),
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

  qrCode = 'assets/img/qr-code.png';
  firstSpinner = true;
  secondSpinner = true;

  constructor() {

  }

  doSubmit() {
    this.swapProcess.submitAmount = true;
  }

  firstAnimationDone(event) {
    if (event.toState === 'void') {
      this.swapProcess.showQRCode = true;
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
