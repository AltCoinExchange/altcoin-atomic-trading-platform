import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SideAContainerComponent} from "./side-a.component";
import {ShapeShiftCommonModule} from "../../common/common.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "", component: SideAContainerComponent,
      }
    ]),
    ShapeShiftCommonModule
  ],
  declarations: [
    SideAContainerComponent
  ],
  providers: []
})
export class SideAModule {
}
