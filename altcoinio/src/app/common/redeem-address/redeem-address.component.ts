import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../models/coins/coin.model';

@Component({
  selector: 'redeem-address',
  templateUrl: './redeem-address.component.html',
  styleUrls: ['./redeem-address.component.scss'],
})
export class RedeemAddressComponent implements OnInit {

    @Input() coin: Coin;

    constructor() {
    }

    ngOnInit() {
    }

}