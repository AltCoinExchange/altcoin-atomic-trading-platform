import {Component, ChangeDetectionStrategy, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwapIconComponent implements OnInit {
  @Input() fromCoin: Coin;
  @Input() toCoin: Coin;
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
