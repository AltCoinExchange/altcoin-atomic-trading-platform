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
  @Output() chooseDepositCoin: EventEmitter<Coin> = new EventEmitter<Coin>();
  @Output() chooseReceiveCoin: EventEmitter<Coin> = new EventEmitter<Coin>();

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

  ngOnChanges(changes){
    if(typeof changes.fromCoin !== 'undefined' && typeof changes.toCoin == 'undefined'){
      this.firstCoin = changes.fromCoin.currentValue;
    }
    if(typeof changes.toCoin !== 'undefined' && typeof changes.fromCoin == 'undefined'){
      this.secondCoin = changes.toCoin.currentValue;
    }
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

  iconClicked(event, coin){
    event.stopPropagation();
    event.preventDefault();
    if(coin.name == this.fromCoin.name){
      console.log('change deposit')
      this.chooseDepositCoin.emit(this.fromCoin);
      
    }
    else if(coin.name == this.toCoin.name){
      console.log('change receive')
      this.chooseReceiveCoin.emit(this.toCoin); 
    }
      
  }

}
