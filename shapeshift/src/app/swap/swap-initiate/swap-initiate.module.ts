import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ShapeShiftCommonModule} from "../../common/common.module";
import {SwapInitiateComponent} from "./swap-initiate.component";
import {CoinInputModule} from "../../common/coin-input/coin-input.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ShapeShiftCommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "", component: SwapInitiateComponent,
      }
    ]),
    CoinInputModule
  ],
  declarations: [
    SwapInitiateComponent,
  ],
  providers: []
})
export class SwapInitiateModule {
}
