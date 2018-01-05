import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {EmptyWalletComponent} from "./empty-wallet.component";
import {ShapeshiftButtonModule} from "../../common/shapeshift-button/shapeshift-button.module";


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {path: "", component: EmptyWalletComponent},
    ]),
    ShapeshiftButtonModule,
    MatCardModule,
  ],
  declarations: [
    EmptyWalletComponent,
  ],
  providers: []
})
export class EmptyWalletModule {
  constructor() {
    console.log("empty wallet", performance.now());
  }
}
