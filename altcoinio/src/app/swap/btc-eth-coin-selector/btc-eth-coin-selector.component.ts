import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {coinSwapsAnimation} from "../../animations/animations";
import {EthCoinModel} from "../../models/coins/eth-coin.model";
import {BtcCoinModel} from "../../models/coins/btc-coin.model";

@Component({
  selector: 'app-btc-eth-coin-selector',
  templateUrl: './btc-eth-coin-selector.component.html',
  styleUrls: ['./btc-eth-coin-selector.component.scss'],
  animations: [coinSwapsAnimation],
})
export class BtcEthCoinSelectorComponent implements OnInit {
  ethCoin = new EthCoinModel();
  btcCoin = new BtcCoinModel();
  fromCoinAnimationSwapState = "slideBack";

  @Output() select: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
