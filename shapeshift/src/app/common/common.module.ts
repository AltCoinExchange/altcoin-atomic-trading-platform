import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RedeemAddressComponent} from "./redeem-address/redeem-address.component";
import {InfoMessageComponent} from "./info-message/info-message.component";
import {AllCoinsDialogComponent} from "./coins-dialog/all-coins.dialog";
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatProgressSpinnerModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SwapCompleteComponent} from "../swap/swap-complete/swap-complete.component";
import {ProgressBarComponent} from "../components/progress-bar/progress-bar.component";
import {CoinInputModule} from "./coin-input/coin-input.module";
import {ShapeshiftButtonModule} from "./shapeshift-button/shapeshift-button.module";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    CoinInputModule,
    ShapeshiftButtonModule
  ],
  declarations: [
    RedeemAddressComponent,
    InfoMessageComponent,
    AllCoinsDialogComponent,
    SwapCompleteComponent,
    ProgressBarComponent,
  ],
  exports: [
    RedeemAddressComponent,
    InfoMessageComponent,
    AllCoinsDialogComponent,
    SwapCompleteComponent,
    CoinInputModule,
    ShapeshiftButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  entryComponents: [
    AllCoinsDialogComponent
  ]
})
export class ShapeShiftCommonModule {
}

// TODO from Swaps create shared swap module
