import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SwapProcess} from '../../models/swap-process.model';
import {Coin} from '../../models/coin.model';

@Component({
  selector: 'app-swap-inputs',
  templateUrl: './swap-inputs.component.html',
  styleUrls: ['./swap-inputs.component.scss'],
})
export class SwapInputsComponent implements OnInit {
  @Input() depositCoin: Coin;
  @Input() receiveCoin: Coin;
  @Output() swap: EventEmitter<Coin> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  submitSwap() {
    const model = {
      ...this.depositCoin,
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
