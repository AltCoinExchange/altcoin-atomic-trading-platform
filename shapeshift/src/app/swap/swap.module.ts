import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ShapeShiftCommonModule} from '../common/common.module';
import {SwapIconComponent} from '../components/swap-icon/swap-icon.component';
import {QrCodeComponent} from './qr-code/qr-code.component';
import {SwapContainerComponent} from './swap-container/swap-container.component';
import {SwapStartComponent} from './swap-start/swap-start.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TransferLinkComponent} from './transfer-link/transfer-link.component';
import {SwapInputsModule} from '../components/swap-inputs/swap-inputs.module';
import {SwapInitiateComponent} from './swap-initiate/swap-initiate.component';
import {ProgressBarComponent} from '../components/progress-bar/progress-bar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: SwapContainerComponent, children: [
        {path: '', redirectTo: 'swap', pathMatch: 'full'},
        {path: 'swap', component: SwapStartComponent},
        {path: 'insufficient-amount', component: QrCodeComponent},
        {path: 'transfer', component: TransferLinkComponent},
        {path: 'initiate/:link', component: SwapInitiateComponent},
      ],
      },
    ]),
    ShapeShiftCommonModule,
    FlexLayoutModule,
    SwapInputsModule,
  ],
  declarations: [
    SwapIconComponent,
    QrCodeComponent,
    SwapContainerComponent,
    SwapStartComponent,
    TransferLinkComponent,
    SwapInitiateComponent,
    ProgressBarComponent
  ],
})
export class SwapModule {
}
