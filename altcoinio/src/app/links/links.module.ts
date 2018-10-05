import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LinksComponent} from './links.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AltcoinIoCommonModule} from '../common/common.module';
import { MatListModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AltcoinIoCommonModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: '', component: LinksComponent
      }
    ]),
  ],
  declarations: [
    LinksComponent
  ],
})
export class LinksModule {
}
