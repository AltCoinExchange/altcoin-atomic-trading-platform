import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoinInputComponent} from './coin-input/coin-input.component';
import {ShapeshiftButtonComponent} from './shapeshift-button/shapeshift-button.component';
import {RedeemAddressComponent} from './redeem-address/redeem-address.component';
import {InfoMessageComponent} from './info-message/info-message.component';
import {AllCoinsDialogComponent} from './coins-dialog/all-coins.dialog';
import {MatButtonModule, MatCardModule, MatDialogModule, MatIconModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [
    CoinInputComponent,
    ShapeshiftButtonComponent,
    RedeemAddressComponent,
    InfoMessageComponent,
    AllCoinsDialogComponent
  ],
  exports: [
    CoinInputComponent,
    ShapeshiftButtonComponent,
    RedeemAddressComponent,
    InfoMessageComponent,
    AllCoinsDialogComponent
  ],
  entryComponents: [
    AllCoinsDialogComponent
  ]
})
export class ShapeShiftCommonModule {
}
