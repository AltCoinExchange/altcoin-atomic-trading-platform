import {Component, ChangeDetectionStrategy, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../models/coins/coin.model';
import { coinSwapsAnimation } from '../../animations/animations';

@Component({
  selector: 'app-swap-icon',
  templateUrl: './swap-icon.component.html',
  styleUrls: ['./swap-icon.component.scss'],
  animations: [ coinSwapsAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwapIconComponent implements OnInit {
  @Input() fromCoin: Coin;
  @Input() toCoin: Coin;
  @Input() swapEnabled: boolean;
  @Output() swapped: EventEmitter<void> = new EventEmitter<void>();

  fromCoinAnimationSwapState = 'slideBack';
  toCoinAnimationSwapState = 'slideBack';
  firstCoin = undefined;
  secondCoin = undefined;

  constructor() {

  }

  ngOnInit() {
    this.firstCoin = this.fromCoin;
    this.secondCoin = this.toCoin;
  }

  animateCoinSwap(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.fromCoinAnimationSwapState === 'slideBack') {
      this.fromCoinAnimationSwapState = 'slideLeft';
      this.toCoinAnimationSwapState = 'slideRight';
    }
    else {
      this.fromCoinAnimationSwapState = 'slideBack';
      this.toCoinAnimationSwapState = 'slideBack';
    }
    this.swapped.emit();
  }

}
