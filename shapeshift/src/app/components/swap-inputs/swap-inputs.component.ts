import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../models/coins/coin.model';

@Component({
  selector: 'app-swap-inputs',
  templateUrl: './swap-inputs.component.html',
  styleUrls: ['./swap-inputs.component.scss'],
})
export class SwapInputsComponent implements OnInit {
  @Input() depositCoin;
  @Input() receiveCoin;

  @Input() receiveQuote;
  @Output() swap: EventEmitter<{ depositCoin: Coin, receiveCoin: Coin }> = new EventEmitter();
  @Output() depositChange: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  submitSwap() {
    const model = {
      depositCoin: this.depositCoin,
      receiveCoin: this.receiveCoin.update({amount: this.receiveQuote}),
    };

    this.swap.emit(model);
  }

  updateDepositCoinAmount(depositCoinAmount: number) {
    this.depositChange.next(depositCoinAmount);
    this.depositCoin = this.depositCoin.update(depositCoinAmount);
  }
}
