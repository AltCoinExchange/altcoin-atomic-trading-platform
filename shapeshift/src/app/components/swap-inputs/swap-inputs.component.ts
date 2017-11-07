import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SwapProcess} from '../../models/swap-process.model';
import {Coin} from '../../models/coins/coin.model';

@Component({
  selector: 'app-swap-inputs',
  templateUrl: './swap-inputs.component.html',
  styleUrls: ['./swap-inputs.component.scss'],
})
export class SwapInputsComponent implements OnInit {
  @Input() depositCoin;
  @Input() receiveCoin;
  @Output() swap: EventEmitter<{depositCoin: Coin, receiveCoin: Coin}> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  submitSwap() {
    const model = {
      depositCoin: this.depositCoin,
      receiveCoin: this.receiveCoin,
    };
    this.swap.emit(model);
  }

  updateDepositCoinAmount(depositCoinAmount: number) {
    this.depositCoin = {
      ...this.depositCoin,
      amount: depositCoinAmount,
    };
  }
}
