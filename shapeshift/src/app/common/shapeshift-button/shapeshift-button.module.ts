import {NgModule} from "@angular/core";
import {ShapeshiftButtonComponent} from "./shapeshift-button.component";
import {MatButtonModule} from "@angular/material";


@NgModule({
  imports: [
    MatButtonModule
  ],
  declarations: [
    ShapeshiftButtonComponent,
  ],
  exports: [ShapeshiftButtonComponent]
})
export class ShapeshiftButtonModule {

}
