import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {TransferLinkComponent} from "./transfer-link.component";
import {ShapeShiftCommonModule} from "../../common/common.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "", component: TransferLinkComponent,
      }
    ]),
    FlexLayoutModule,
    ShapeShiftCommonModule
  ],
  declarations: [
    TransferLinkComponent
  ],
  providers: []
})
export class TransferLinkModule {
}
