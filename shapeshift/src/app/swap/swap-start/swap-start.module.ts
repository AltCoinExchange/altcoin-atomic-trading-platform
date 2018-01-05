import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {SwapStartComponent} from "./swap-start.component";
import {RouterModule} from "@angular/router";
import {ShapeShiftCommonModule} from "../../common/common.module";
import {SwapInputsModule} from "../../components/swap-inputs/swap-inputs.module";
import {EffectsModule} from "@ngrx/effects";
import {QuoteEffect} from "../../effects/quote.effect";
import {QuoteService} from "../../services/quote.service";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
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
    SwapStartComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    QuoteService,
  ]
})
export class SwapStartModule {
}
