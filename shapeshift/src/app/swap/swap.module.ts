import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SwapComponent} from './swap.component';
import {ShapeShiftCommonModule} from '../common/common.module';
import {SwapIconComponent} from './swap-icon/swap-icon.component';
import {QrCodeComponent} from './qr-code/qr-code.component';
import {SwapContainerComponent} from './swap-container/swap-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: SwapContainerComponent, children: [
        {path: '', redirectTo: 'swap', pathMatch: 'full'},
        {path: 'swap', component: SwapComponent},
        {path: 'insufficient-amount', component: QrCodeComponent},
      ],
      },
    ]),
    ShapeShiftCommonModule,
  ],
  declarations: [
    SwapComponent,
    SwapIconComponent,
    QrCodeComponent,
    SwapContainerComponent,
  ],
})
export class SwapModule {
}
