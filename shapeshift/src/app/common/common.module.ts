import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoinInputComponent} from './coin-input/coin-input.component';
import {ShapeshiftButtonComponent} from './shapeshift-button/shapeshift-button.component';
import {RedeemAddressComponent} from './redeem-address/redeem-address.component';
import {InfoMessageComponent} from './info-message/info-message.component';
import {MatButtonModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    CoinInputComponent,
    ShapeshiftButtonComponent,
    RedeemAddressComponent,
    InfoMessageComponent
  ],
  exports: [
    CoinInputComponent,
    ShapeshiftButtonComponent,
    RedeemAddressComponent,
    InfoMessageComponent
  ],
})
export class ShapeShiftCommonModule {
}
