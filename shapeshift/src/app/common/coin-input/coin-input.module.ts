import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {CoinInputComponent} from "./coin-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  declarations: [
    CoinInputComponent
  ],
  exports: [
    CoinInputComponent
  ]
})
export class CoinInputModule {
}
