import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '', loadChildren: 'app/swap/swap.module#SwapModule',
  },
  {
    path: 'wallet', loadChildren: 'app/wallet/wallet.module#WalletModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {
      preloadingStrategy: PreloadAllModules,
    },
  )],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
