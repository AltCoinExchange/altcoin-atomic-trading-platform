import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AltcoinIoCommonModule} from "../../common/common.module";
import {SideBContainerComponent} from "./side-b.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "", component: SideBContainerComponent,
      }
    ]),
    AltcoinIoCommonModule
  ],
  declarations: [
    SideBContainerComponent
  ],
  providers: []
})
export class SideBModule {
}
