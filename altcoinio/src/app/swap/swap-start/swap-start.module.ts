import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {SwapStartComponent} from "./swap-start.component";
import {RouterModule} from "@angular/router";
import {AltcoinIoCommonModule} from "../../common/common.module";
import {SwapInputsModule} from "../../components/swap-inputs/swap-inputs.module";
import {EffectsModule} from "@ngrx/effects";
import {QuoteEffect} from "../../effects/quote.effect";
import {QuoteService} from "../../services/quote.service";
import {SwapIconComponent} from "../swap-icon/swap-icon.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "", component: SwapStartComponent,
      }
    ]),
    AltcoinIoCommonModule,
    FlexLayoutModule,
    SwapInputsModule,
    FormsModule,
    EffectsModule.forFeature([
      QuoteEffect,
    ]),
  ],
  declarations: [
    SwapStartComponent,
    SwapIconComponent,
  ],
  providers: [
    QuoteService,
  ]
})
export class SwapStartModule {
}
