import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
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
import {SwapCompleteComponent} from "../swap/swap-complete/swap-complete.component";
import {ProgressBarComponent} from "../components/progress-bar/progress-bar.component";
import {CoinInputModule} from "./coin-input/coin-input.module";
import {AltcoinioButtonModule} from "./altcoinio-button/altcoinio-button.module";

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
    CoinInputModule,
    AltcoinioButtonModule
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
    AltcoinioButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  entryComponents: [
    AllCoinsDialogComponent
  ]
})
export class AltcoinIoCommonModule {
}

// TODO from Swaps create shared swap module
