import {NgModule} from "@angular/core";
import {AltcoinioButtonComponent} from "./altcoinio-button.component";
import {MatButtonModule} from "@angular/material";


@NgModule({
  imports: [
    MatButtonModule
  ],
  declarations: [
    AltcoinioButtonComponent,
  ],
  exports: [AltcoinioButtonComponent]
})
export class AltcoinioButtonModule {

}
