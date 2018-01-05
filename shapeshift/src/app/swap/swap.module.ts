import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {MatButtonModule, MatProgressSpinnerModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {ShapeShiftCommonModule} from "../common/common.module";
import {ProgressBarComponent} from "../components/progress-bar/progress-bar.component";
import {ProgressStepsComponent} from "../components/progress-steps/progress-steps.component";
import {SwapIconComponent} from "../components/swap-icon/swap-icon.component";
import {SwapInitiatePreviewModule} from "../components/swap-initiate-preview/swap-initiate-preview.module";
import {SwapInitiatedModule} from "../components/swap-initiated/swap-initiated.module";
import {SwapInputsModule} from "../components/swap-inputs/swap-inputs.module";
import {SideAContainerComponent} from "./side-a-container/side-a.component";
import {SideBContainerComponent} from "./side-b-container/side-b.component";
import {SwapCompleteComponent} from "./swap-complete/swap-complete.component";
import {SwapContainerComponent} from "./swap-container/swap-container.component";
import {SwapInitiateComponent} from "./swap-initiate/swap-initiate.component";
import {SwapStartComponent} from "./swap-start/swap-start.component";
import {TransferLinkComponent} from "./transfer-link/transfer-link.component";
import {AuthGuardService} from "../services/auth-redirect.service";
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {EffectsModule} from "@ngrx/effects";
import {QuoteEffect} from "../effects/quote.effect";
import {SideAEffect} from "../effects/side-A.effect";
import {SideBEffect} from "../effects/side-B.effect";
import {LinkService} from "../services/link.service";
import {MoscaService} from "../services/mosca.service";
import {QuoteService} from "../services/quote.service";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    RouterModule.forChild([
      {
        path: "", component: SwapContainerComponent, children: [
        {path: "", redirectTo: "swap", pathMatch: "full"},
        {path: "swap", component: SwapStartComponent, canActivate: [AuthGuardService]},
        {path: "transfer", component: TransferLinkComponent},
        {path: "a/complete", component: SideAContainerComponent},
        {path: "b/complete", component: SideBContainerComponent},
        {path: "initiate/:link", component: SwapInitiateComponent}
      ]
      }
    ]),
    ShapeShiftCommonModule,
    FlexLayoutModule,
    SwapInputsModule,
    SwapInitiatedModule,
    SwapInitiatePreviewModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FormsModule,
    EffectsModule.forFeature([
      QuoteEffect,
      SideAEffect,
      SideBEffect
    ]),
  ],
  declarations: [
    SwapIconComponent,
    SwapContainerComponent,
    SwapStartComponent,
    TransferLinkComponent,
    SwapInitiateComponent,
    ProgressStepsComponent,
    ProgressBarComponent,
    SwapCompleteComponent,
    SideAContainerComponent,
    SideBContainerComponent
  ],
  providers: [
    AuthGuardService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    LinkService,
    MoscaService,
    QuoteService,
  ]
})
export class SwapModule {
}
