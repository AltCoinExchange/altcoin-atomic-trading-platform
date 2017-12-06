import {Injectable} from "@angular/core";
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {Go} from "../actions/router.action";
import * as sideA from "../actions/side-A.action";
import * as sideB from "../actions/side-B.action";
import {AppState} from "../reducers/app.state";
import {getADepositCoin, getALink} from "../selectors/side-a.selector";
import {getInitateLink, getSwapProcess} from "../selectors/start.selector";
import {getWalletState} from "../selectors/wallets.selector";
import {LinkService} from "../services/link.service";
import {MoscaService} from "../services/mosca.service";
import {ShapeshiftStorage} from "../common/shapeshift-storage";
import {CoinFactory} from "../models/coins/coin.model";
import {WalletFactory} from "../models/wallets/wallet";

@Injectable()
export class SideAEffect {

  @Effect()
  $generateLink: Observable<Action> = this.actions$
    .ofType(sideA.GENERATE_LINK)
    .map(toPayload)
    .withLatestFrom(this.store.select(getWalletState))
    .mergeMap(([payload, wallet]) => {
        return this.linkService.generateLink(payload, wallet).map(resp => {
          return new sideA.GenerateLinkSuccessAction(resp);
        }).catch(err => Observable.of(new sideA.GenerateLinkFailAction(err)));
      },
    );

  @Effect()
  $generateLinkSuccess: Observable<Action> = this.actions$
    .ofType(sideA.GENERATE_LINK_SUCCESS)
    .map(toPayload)
    .mergeMap((link) => {
      return Observable.from([
        new sideA.WaitForInitiateAction(link),
        new Go({
          path: ["/transfer"],
        }),
      ]);
    });

  @Effect()
  $waitForInitiate: Observable<Action> = this.actions$
    .ofType(sideA.WAIT_FOR_INITIATE)
    .map(toPayload)
    .mergeMap((link) => {
      return this.moscaService.waitForInitiate(link).map(resp => {
        return new sideA.WaitForInitiateSuccessAction(resp);
      }).catch(err => Observable.of(new sideA.WaitForInitiateFailAction(err)));
    });

  @Effect()
  $waitForInitiateSuccess: Observable<Action> = this.actions$
    .ofType(sideA.WAIT_FOR_INITIATE_SUCCESS)
    .map(toPayload)
    .mergeMap((payload) => {
      return Observable.of(new sideA.ParticipateAction(payload));
    });

  @Effect()
  $participate: Observable<Action> = this.actions$
    .ofType(sideA.PARTICIPATE)
    .map(toPayload)
    .withLatestFrom(this.store.select(getSwapProcess))
    .switchMap(([payload, swapProcess]) => {
      const wallet = WalletFactory.createWallet(swapProcess.depositCoin.type);
      return wallet.Participate(payload, swapProcess.depositCoin).map(resp => {
        console.log("PARTICIPATE RESPONSE:", resp);
        return new sideA.ParticipateSuccessAction(resp);
      }).catch(err => Observable.of(new sideA.ParticipateFailAction(err)));
    });

  @Effect()
  $participateSuccess: Observable<Action> = this.actions$
    .ofType(sideA.PARTICIPATE_SUCCESS)
    .map(toPayload)
    .mergeMap((payload) => {
      return Observable.from([
        new Go({
          path: ["/a/complete"],
        }),
        new sideA.InformParticipateAction(payload),
      ]);
    });

  @Effect()
  $informParticipate: Observable<Action> = this.actions$
    .ofType(sideA.INFORM_PARTICIPATE)
    .map(toPayload)
    .withLatestFrom(
      this.store.select(getALink),
      this.store.select(getADepositCoin),
      this.store.select(getWalletState),
      this.store.select(getSwapProcess),
      (payload, alink, aDepositCoin, walletState, process) => {
        return {
          payload,
          link: alink,
          wallet: walletState,
          process
        };
      }).mergeMap((data) => {
        // TODO payload contains SECRET ------- TODO please correct this
        console.log("TODO payload contains SECRET ------- TODO please correct this");
        console.log(data);
        const address = data.wallet[data.process.depositCoin.name].address;
        data.payload = {
          ...data.payload,
          address,
        };
        return this.moscaService.informParticipate(data.link, data.payload).map(() => {
          return new sideA.InformParticipateSuccessAction(data.payload);
        }).catch(err => Observable.of(new sideB.InformInitiateFailAction(err)));
      },
    );

  @Effect()
  $informParticipateSuccess: Observable<Action> = this.actions$
    .ofType(sideA.INFORM_PARTICIPATE_SUCCESS)
    .map(toPayload)
    .mergeMap((payload) => {
        return Observable.of(new sideA.WaitForBRedeemAction(payload));
    });

  @Effect()
  $waitForBRedeem: Observable<Action> = this.actions$
    .ofType(sideA.WAIT_FOR_BREDEEM)
    .map(toPayload)
    .withLatestFrom(
      this.store.select(getALink),
      (payload, alink) => {
        return {
          payload,
          link: alink
        };
      })
    .mergeMap((data) => {
      return this.moscaService.waitForBRedeem(data.link).map(resp => {
        return new sideA.WaitForBRedeemSuccessAction(resp);
      }).catch(err => Observable.of(new sideB.WaitForParticipateFailAction(err)));
    });

  @Effect()
  $waitForBRedeemSuccess: Observable<Action> = this.actions$
    .ofType(sideA.WAIT_FOR_BREDEEM_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.ExtractSecretAction(resp);
      });
    });

  @Effect()
  $extractSecret: Observable<Action> = this.actions$
    .ofType(sideA.EXTRACT_SECRET)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.ExtractSecretSuccessAction(resp);
      }).catch(err => Observable.of(new sideA.ExtractSecretFailAction(err)));
    });

  @Effect()
  $extractSecretSuccess: Observable<Action> = this.actions$
    .ofType(sideA.EXTRACT_SECRET_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.ARedeemAction(resp);
      });
    });

  @Effect()
  $redeemA: Observable<Action> = this.actions$
    .ofType(sideA.AREDEEM)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.ARedeemSuccessAction(resp);
      }).catch(err => Observable.of(new sideA.ARedeemFailAction(err)));
    });

  @Effect()
  $redeemASuccess: Observable<Action> = this.actions$
    .ofType(sideA.AREDEEM_SUCCESS)
    .mergeMap(() => {
      return Observable.empty().map(resp => { // TODO provide implementation
        return new sideA.ADoneAction(resp);
      });
    });


  $done;

  constructor(private actions$: Actions, private linkService: LinkService,
              private store: Store<AppState>, private moscaService: MoscaService) {

  }
}
