import {Component, OnInit} from "@angular/core";
import {Coin, CoinFactory} from "../../models/coins/coin.model";

@Component({
  selector: "app-token-list",
  templateUrl: "./token-list.component.html",
  styleUrls: ["./token-list.component.scss"]
})
export class TokenListComponent implements OnInit {

  tokens: Array<Coin>;
  soon;

  constructor() {
    this.tokens = CoinFactory.createAllCoins();
    this.soon = CoinFactory.createSoonCoins();
    this.soon.forEach(coin => {
      coin.comingSoon = true;
    });
    this.tokens = this.tokens.concat(this.soon);
  }

  ngOnInit() {
  }

}
