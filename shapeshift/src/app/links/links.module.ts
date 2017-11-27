import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LinksComponent} from './links.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ShapeShiftCommonModule} from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    ShapeShiftCommonModule,
    FlexLayoutModule,
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
