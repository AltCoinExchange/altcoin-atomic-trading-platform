import {Component, Input, OnInit} from "@angular/core";
import {coinSwapsAnimation} from "../../animations/animations";

@Component({
  selector: "app-coin-selector",
  templateUrl: "./coin-selector.component.html",
  styleUrls: ["./coin-selector.component.scss"],
  animations: [coinSwapsAnimation],
})
export class CoinSelectorComponent implements OnInit {
  @Input() coin;

  constructor() {
  }

  ngOnInit() {
  }

}
