import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ShapeShiftCommonModule} from "../../common/common.module";
import {SwapInitiateComponent} from "./swap-initiate.component";
import {CoinInputModule} from "../../common/coin-input/coin-input.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuoteEffect} from "../../effects/quote.effect";
import {EffectsModule} from "@ngrx/effects";
import {QuoteService} from "../../services/quote.service";

@NgModule({
  imports: [
    CommonModule,
    ShapeShiftCommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "", component: SwapInitiateComponent,
      }
    ]),
    EffectsModule.forFeature([
      QuoteEffect,
    ]),
    CoinInputModule
  ],
  declarations: [
    SwapInitiateComponent,
  ],
  providers: [QuoteService]
})
export class SwapInitiateModule {
}
