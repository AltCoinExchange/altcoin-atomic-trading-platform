import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ShapeShiftCommonModule} from "../common/common.module";
import {ProgressStepsComponent} from "../components/progress-steps/progress-steps.component";
import {SwapContainerComponent} from "./swap-container/swap-container.component";
import {AuthGuardService} from "../services/auth-redirect.service";
import {EffectsModule} from "@ngrx/effects";
import {SideAEffect} from "../effects/side-A.effect";
import {LinkService} from "../services/link.service";
import {MoscaService} from "../services/mosca.service";
import {SideBEffect} from "../effects/side-B.effect";
import {HttpModule} from "@angular/http";
import {OrderService} from "../services/order.service";
import {TokensModule} from "../tokens/tokens.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "", component: SwapContainerComponent, children: [
        {path: "", redirectTo: "swap", pathMatch: "full"},
        {
          path: "swap",
          loadChildren: "app/swap/swap-start/swap-start.module#SwapStartModule",
          canActivate: [AuthGuardService]
        },
        {path: "transfer", loadChildren: "app/swap/transfer-link/transfer-link.module#TransferLinkModule"},
        {path: "a/complete", loadChildren: "app/swap/side-a-container/side-a.module#SideAModule"},
        {path: "b/complete", loadChildren: "app/swap/side-b-container/side-b.module#SideBModule"},
      ]
      }
    ]),
    HttpModule,
    ShapeShiftCommonModule,
    FlexLayoutModule,
    FormsModule,
    EffectsModule.forFeature([
      SideAEffect,
      SideBEffect,
    ]),
    TokensModule,
  ],
  declarations: [
    SwapContainerComponent,
    ProgressStepsComponent,
  ],
  providers: [
    AuthGuardService,
    LinkService,
    MoscaService,
    OrderService,
  ]
})
export class SwapModule {
}
