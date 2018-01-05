import {Component, Input, OnInit} from "@angular/core";
import {Coin} from "../../models/coins/coin.model";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ValueAccessorBase} from "../value-accessor-base";


@Component({
  selector: "coin-input",
  templateUrl: "./coin-input.component.html",
  styleUrls: ["./coin-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CoinInputComponent,
      multi: true,
    },
  ],
})
export class CoinInputComponent extends ValueAccessorBase<Number> implements OnInit {
  @Input() coin: Coin;
  @Input() disabled: boolean = false;
  @Input() usd: boolean = false;
  @Input() type = "number";
  @Input() value;
  @Input() label: string;
  @Input() alignLabel: string = "center";

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
