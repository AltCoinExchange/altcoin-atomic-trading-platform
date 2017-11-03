import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SwapComponent} from './swap.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'swap', pathMatch: 'full'},
      {path: 'swap', component: SwapComponent},
    ]),
  ],
  declarations: [
    SwapComponent,
  ],
})
export class SwapModule {
}
