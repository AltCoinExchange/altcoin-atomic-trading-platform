import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShapeshiftButtonComponent} from "./shapeshift-button/shapeshift-button.component";
import {RedeemAddressComponent} from "./redeem-address/redeem-address.component";
import {InfoMessageComponent} from "./info-message/info-message.component";
import {AllCoinsDialogComponent} from "./coins-dialog/all-coins.dialog";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatProgressSpinnerModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SwapIconComponent} from "../components/swap-icon/swap-icon.component";
import {SwapCompleteComponent} from "../swap/swap-complete/swap-complete.component";
import {ProgressBarComponent} from "../components/progress-bar/progress-bar.component";
import {CoinInputModule} from "./coin-input/coin-input.module";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    CoinInputModule
  ],
  declarations: [
    ShapeshiftButtonComponent,
    RedeemAddressComponent,
    InfoMessageComponent,
    AllCoinsDialogComponent,
    SwapIconComponent,
    SwapCompleteComponent,
    ProgressBarComponent,
  ],
  exports: [
    ShapeshiftButtonComponent,
    RedeemAddressComponent,
    InfoMessageComponent,
    AllCoinsDialogComponent,
    SwapIconComponent,
    SwapCompleteComponent,
    CoinInputModule
  ],
  entryComponents: [
    AllCoinsDialogComponent
  ]
})
export class ShapeShiftCommonModule {
}

// TODO from Swaps create shared swap module
