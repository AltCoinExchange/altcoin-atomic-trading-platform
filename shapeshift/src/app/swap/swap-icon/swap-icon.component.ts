import {Component, Input, OnInit} from '@angular/core';
import {Coin} from '../../models/coin.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-swap-icon',
  templateUrl: './swap-icon.component.html',
  styleUrls: ['./swap-icon.component.scss'],
  animations: [
    trigger('coinSwaps', [
      state('slideRight', style({transform: 'translateX(200%)'})),
      state('slideLeft', style({transform: 'translateX(-200%)'})),
      state('slideBack', style({transform: 'translateX(0%)'})),
      transition('* <=> *', animate('500ms ease-in-out')),
    ]),
  ],
})
export class SwapIconComponent implements OnInit {
  @Input() fromCoin: Coin;
  @Input() toCoin: Coin;

  constructor() {
  }

  ngOnInit() {
  }


  animateCoinSwap(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.fromCoin.animationSwapState === 'slideBack') {
      this.fromCoin.animationSwapState = 'slideRight';
      this.toCoin.animationSwapState = 'slideLeft';
    }
    else {
      this.fromCoin.animationSwapState = 'slideBack';
      this.toCoin.animationSwapState = 'slideBack';
    }
    this.swapDepositRecieveCoins();
    return false;
  }

  swapDepositRecieveCoins() {
    const temp = this.fromCoin;
    this.fromCoin = this.toCoin;
    this.toCoin = temp;
  }

}
