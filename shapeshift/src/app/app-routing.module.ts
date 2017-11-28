import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '', loadChildren: 'app/swap/swap.module#SwapModule',
  },
  {
    path: 'wallet', loadChildren: 'app/wallet/wallet.module#WalletModule'
  },
  {
      path: 'links', loadChildren: 'app/links/links.module#LinksModule'
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
