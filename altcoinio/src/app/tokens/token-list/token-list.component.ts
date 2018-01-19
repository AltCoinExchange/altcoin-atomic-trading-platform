import {Component, OnInit} from "@angular/core";
import {Coin, CoinFactory} from "../../models/coins/coin.model";

@Component({
  selector: "app-token-list",
  templateUrl: "./token-list.component.html",
  styleUrls: ["./token-list.component.scss"]
})
export class TokenListComponent implements OnInit {

  tokens: Array<Coin>;

  constructor() {
    this.tokens = CoinFactory.createAllCoins();
  }

  ngOnInit() {
  }

}
