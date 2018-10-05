import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SideAContainerComponent} from "./side-a.component";
import {AltcoinIoCommonModule} from "../../common/common.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "", component: SideAContainerComponent,
      }
    ]),
    AltcoinIoCommonModule
  ],
  declarations: [
    SideAContainerComponent
  ],
  providers: []
})
export class SideAModule {
}
