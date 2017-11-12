import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as startAction from '../actions/start.action';
import {
  InformParticipatedAction,
  ParticipateSuccessAction,
  RedeemSuccessAction,
  WaitForParticipateSuccessAction
} from '../actions/start.action';
import * as swapAction from '../actions/swap.action';
import * as auditContractAction from '../actions/swap-audit.action';
import * as walletSelector from '../selectors/wallets.selector';
import {Go} from '../actions/router.action';
import {AppState} from '../reducers/app.state';
import {LinkService} from '../services/link.service';
import {SwapService} from '../services/swap.service';
import {getSwapProcess} from "../selectors/start.selector";
import {getInitiateData, getSwapCoins} from "../selectors/swap.selector";


@Injectable()
export class SwapEffect {

  @Effect()
  generateLink$: Observable<Action> = this.actions$
    .ofType(startAction.START_SWAP)
    .map(toPayload)
    .withLatestFrom(this.store.select(walletSelector.getWalletState))
    .mergeMap(([data, wallets]) => {
        return this.linkService.generateLink(data, wallets).mergeMap(link => {
          return Observable.from([
            new startAction.SetLinkAction(link),
            new Go({
              path: ['/transfer'],
            }),
            new startAction.WaitForInitiateAction(link),
          ]);
        });
      },
    );

  @Effect()
  auditContract$: Observable<Action> = this.actions$
    .ofType(auditContractAction.SWAP_AUDIT)
    .map(toPayload)
    .mergeMap(payload => {
      return this.swapService.auditContract(payload).map(r => {
        return new auditContractAction.SwapAuditSuccessAction(r);
      });
    });

  @Effect()
  initiate$: Observable<Action> = this.actions$
    .ofType(swapAction.INITIATE)
    .map(toPayload)
    .withLatestFrom(this.store.select(walletSelector.getWalletState))
    .mergeMap(([payload, wallets]) => {
      const wallet = wallets[payload.depositCoin.name];
      const newAddress = payload.depositCoin.generateNewAddress(wallet);

      return this.swapService.initiate(payload)
        .mergeMap(res => {
          return Observable.from([
            new swapAction.InitiateSuccessAction(res),
            new startAction.InformInitiatedAction({
              link: payload.link,
              data: {
                secretHash: res.secretHash,
                address: newAddress,
                value: payload.depositCoin.amount,
              },
            }),
            new Go({
              path: ['/complete'],
            }),
          ]);
        })
        .catch(err => Observable.of(new swapAction.InitiateFailAction(err)));
    });

  @Effect()
  waitForInitiate$: Observable<Action> = this.actions$
    .ofType(startAction.WAIT_FOR_INITIATE)
    .map(toPayload)
    .switchMap(payload => {
      return this.swapService.waitForInitiate(payload).map(a => {
        return new startAction.WaitForInitiateSuccessAction(a);
      });
    });

  @Effect()
  informInitiated: Observable<Action> = this.actions$
    .ofType(startAction.INFORM_INITIATED)
    .map(toPayload)
    .mergeMap(payload => {
      this.swapService.informInitiated(payload);
      return this.swapService.waitForParticipate(payload.data.secretHash + payload.data.address).map(participateData => {
        console.log('waitForParticipate', participateData);
        return new WaitForParticipateSuccessAction(participateData);
      })
    });

  @Effect()
  participate: Observable<Action> = this.actions$
    .ofType(startAction.WAIT_FOR_INITIATE_SUCCESS)
    .map(toPayload)
    .withLatestFrom(this.store.select(getSwapProcess))
    .mergeMap(([payload, swapProcess]) => {
      const data = payload[0].data.data;
      return this.swapService.participate(swapProcess.depositCoin, data.address, data.secretHash).mergeMap(partData => {
        return Observable.from(
          [
            new ParticipateSuccessAction(partData),
            new InformParticipatedAction({
              id: data.secretHash + data.address,
              data: partData,
            }),
          ]
        );
      });
    });

  @Effect()
  waitForRedeem: Observable<Action> = this.actions$
    .ofType(startAction.PARTICIPATE_SUCCESS)
    .map(toPayload)
    .withLatestFrom(this.store.select(getSwapProcess))
    .mergeMap(([payload, swapProcess]) => {
      let redeemId;
      if (payload.to) { //ETH TODO - return class that knows how to generate itself
        redeemId = payload.to + payload.blockHash;
      } else {
        redeemId = payload.rawTx;
      }
      console.log('redeemId', redeemId);
      this.swapService.waitForRedeem(redeemId).subscribe(r => {
        console.log(r[0].data.data);
        swapProcess.depositCoin.extractSecret('0x' + r[0].data.data).subscribe(secret => {
          console.log(secret);
        });
      });
      return Observable.empty();
    });


  @Effect()
  informParticipated: Observable<Action> = this.actions$
    .ofType(startAction.INFORM_PARTICIPATED)
    .map(toPayload)
    .mergeMap((data) => {
      console.log('informParticipated', data);
      this.swapService.informParticipated(data);
      return Observable.empty();
    });

  @Effect()
  redeem: Observable<Action> = this.actions$
    .ofType(startAction.WAIT_FOR_PARTICIPATE_SUCCESS)
    .map(toPayload)
    .withLatestFrom(this.store.select(getInitiateData), this.store.select(getSwapCoins), (payload, initData, coins) => {
      return {
        payload, initData, coins
      }
    })
    .mergeMap((a) => {
      console.log('WAIT_FOR_PARTICIPATE_SUCCESS', a);
      let redeem;
      if (a.payload[0].data.data.contract) {
        console.log('redeeming params', a.payload[0].data.data.contract, a.payload[0].data.data.contractTx.hex, a.initData.secret);
        redeem = a.coins.depositCoin.redeem(a.payload[0].data.data.contractHex, a.payload[0].data.data.contractTxHex, a.initData.secret);
      } else {
        redeem = a.coins.depositCoin.redeem('0x' + a.initData.secret, '0x' + a.initData.secretHash);
      }
      return redeem.map(r => {
        console.log('r', r);

        let id;
        if (a.payload[0].data.data.to) {
          id = a.payload[0].data.data.to + a.payload[0].data.data.blockHash
        } else {
          id = a.payload[0].data.data.rawTx;
        }
        console.log('id', id);
        let informParticipate = {
          id: id,
          data: a.initData.secretHash
        };
        this.swapService.informParticipated(informParticipate);
        return new RedeemSuccessAction();
      });
    });


  constructor(private linkService: LinkService,
              private actions$: Actions,
              private store: Store<AppState>,
              private swapService: SwapService) {
  }
}
