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
import {InformInitiatedDataModel} from "../models/inform-initiated-data.model";
import {InformParticipatedDataModel} from "../models/inform-participated-data.model";
import {ParticipateDataFactory} from "../models/factory-participated-data";


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

      return this.swapService.initiate(payload.address, payload.coin)
        .mergeMap(res => {
          console.log('initData', res);
          return Observable.from([
            new swapAction.InitiateSuccessAction(res),
            new startAction.InformInitiatedAction(
              new InformInitiatedDataModel(
                payload.link, {
                  secretHash: res.secretHash,
                  address: newAddress,
                  value: payload.depositCoin.amount,
                })
            ),
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
      return this.swapService.waitForInitiate(payload).map(initiateBigChainDBResponse => {
        return new startAction.WaitForInitiateSuccessAction(InformInitiatedDataModel.newFrom(initiateBigChainDBResponse));
      });
    });

  @Effect()
  informInitiated: Observable<Action> = this.actions$
    .ofType(startAction.INFORM_INITIATED)
    .map(toPayload)
    .mergeMap((payload: InformInitiatedDataModel) => {
      this.swapService.informInitiated(payload);
      return this.swapService.waitForParticipate(payload.participateId).map(participateData => {
        return new WaitForParticipateSuccessAction(ParticipateDataFactory.createData(participateData.data.coin, participateData.data));
      })
    });

  @Effect()
  participate: Observable<Action> = this.actions$
    .ofType(startAction.WAIT_FOR_INITIATE_SUCCESS)
    .map(toPayload)
    .withLatestFrom(this.store.select(getSwapProcess))
    .mergeMap(([payload, swapProcess]) => {
      const initiateData = (payload as InformInitiatedDataModel);

      return this.swapService.participate(swapProcess.depositCoin, initiateData).mergeMap(partData => {
        return Observable.from(
          [
            new ParticipateSuccessAction(partData),
            new InformParticipatedAction(new InformParticipatedDataModel(initiateData.participateId, partData, swapProcess.depositCoin.name)),
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
      let redeemParams = a.payload.redeemParams(a.initData);
      console.log('!!! redeemParams !!!', redeemParams);
      let redeem = a.coins.depositCoin.redeem(redeemParams);

      return redeem.map(r => {
        console.log('redeem data: ', r);

        let id;
        if (a.payload.data.to) {
          id = a.payload.data.to + a.payload.data.blockHash
        } else {
          id = a.payload.data.rawTx;
        }
        console.log('id', id);
        let informRedeem = {
          id: id,
          data: a.initData.secretHash
        };
        this.swapService.informRedeemed(informRedeem);
        return new RedeemSuccessAction();
      });
    });


  constructor(private linkService: LinkService,
              private actions$: Actions,
              private store: Store<AppState>,
              private swapService: SwapService) {
  }
}
