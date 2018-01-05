import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/observable/of";
import "rxjs/add/observable/from";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/first";
import "rxjs/add/operator/filter";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/empty";


import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {AppModule} from "./app/app.module";
import {environment} from "./environments/environment";

if (environment.production) {
  enableProdMode();
  window.console.log = function () {
  };
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    if (environment.production && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/ngsw-worker.js").then(resp => {
        console.log(resp);
      }).catch(err => {
        console.error(err);
      });
    }
  })
  .catch(err => console.log(err));
