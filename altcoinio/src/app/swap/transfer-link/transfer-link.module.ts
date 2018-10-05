import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {TransferLinkComponent} from "./transfer-link.component";
import {AltcoinIoCommonModule} from "../../common/common.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "", component: TransferLinkComponent,
      }
    ]),
    FlexLayoutModule,
    AltcoinIoCommonModule
  ],
  declarations: [
    TransferLinkComponent
  ],
  providers: []
})
export class TransferLinkModule {
}
