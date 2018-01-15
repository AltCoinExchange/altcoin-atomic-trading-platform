import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {SwapStartComponent} from "./swap-start.component";
import {RouterModule} from "@angular/router";
import {ShapeShiftCommonModule} from "../../common/common.module";
import {SwapInputsModule} from "../../components/swap-inputs/swap-inputs.module";
import {EffectsModule} from "@ngrx/effects";
import {QuoteEffect} from "../../effects/quote.effect";
import {QuoteService} from "../../services/quote.service";
import {SwapIconComponent} from "../swap-icon/swap-icon.component";
import {CoinSelectorComponent} from "../coin-selector/coin-selector.component";
import {BtcEthCoinSelectorComponent} from "../btc-eth-coin-selector/btc-eth-coin-selector.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "", component: SwapStartComponent,
      }
    ]),
    ShapeShiftCommonModule,
    FlexLayoutModule,
    SwapInputsModule,
    FormsModule,
    EffectsModule.forFeature([
      QuoteEffect,
    ]),
  ],
  declarations: [
    SwapStartComponent,
    CoinSelectorComponent,
    SwapIconComponent,
    BtcEthCoinSelectorComponent,
  ],
  providers: [
    QuoteService,
  ]
})
export class SwapStartModule {
}
