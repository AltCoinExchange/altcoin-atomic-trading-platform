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
import {getInitateLink, getSwapProcess} from "../selectors/start.selector";
import {getInitiateData, getSwapCoins, getSwapState} from "../selectors/swap.selector";
import {InformInitiatedDataModel} from "../models/inform-initiated-data.model";
import {InformParticipatedDataModel} from "../models/inform-participated-data.model";
import {ParticipateDataFactory} from "../models/factory-participated-data";
import {MoscaService} from "../services/mosca.service";
import {Http} from "@angular/http";

@Injectable()
export class SwapEffect {

  @Effect()
  generateLink$: Observable<Action> = this.actions$
    .ofType(startAction.START_SWAP)
    .map(toPayload)
    .withLatestFrom(this.store.select(walletSelector.getWalletState))
    .mergeMap(([data, wallets]) => {
        const success = this.linkService.generateLink(data, wallets).mergeMap(link => {
          return Observable.from([
            new startAction.SetLinkAction(link),
            new Go({
              path: ['/transfer'],
            }),
            new startAction.WaitForInitiateAction(link),
          ]);
        });

        return data.depositCoin.getBalance(data.depositCoin.generateNewAddress('')).mergeMap(balance => {
          console.log('balance', balance);
          if (balance <= data.depositCoin.amount) {
            return Observable.of(new Go({
              path: ['/wallet'],
            }));
          }
          return success;
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

      //WAIT FOR INITIATE
      const topic = '/initiate/' + payload.replace('=', '').replace('=', '');
      this.moscaService.subscribeToTopic(topic);
      return this.moscaService.onMessage(topic).map(initiateBigChainDBResponse => {
        return new startAction.WaitForInitiateSuccessAction(InformInitiatedDataModel.newFrom(
          {
            id: initiateBigChainDBResponse.topic,
            data: JSON.parse(initiateBigChainDBResponse.message)
          }
        ));
      });
    });

  @Effect()
  informInitiated: Observable<Action> = this.actions$
    .ofType(startAction.INFORM_INITIATED)
    .map(toPayload)
    .mergeMap((payload: InformInitiatedDataModel) => {
      this.moscaService.sendMsg('/initiate/' + payload.link, JSON.stringify(payload.data));

      //WAIT FOR PARTICIPATE
      const topic = '/participate/' + payload.link;
      console.log('WAIT FOR PARTICIPATE', topic);
      this.moscaService.subscribeToTopic(topic);

      return this.moscaService.onMessage(topic).map(participateData => {
        const data = JSON.parse(participateData.message);
        return new WaitForParticipateSuccessAction(ParticipateDataFactory.createData(data.coin, data));
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
            new ParticipateSuccessAction(initiateData.link),
            new InformParticipatedAction(new InformParticipatedDataModel(initiateData.link, partData, swapProcess.depositCoin.name)),
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

      //WAIT FOR REDEEM
      console.log(' !!!!!!!!!!!!! waiting for redeeem ', payload);
      const redeemTopic = payload.replace('initiate', 'redeem');
      this.moscaService.subscribeToTopic(redeemTopic);
      return this.moscaService.onMessage(redeemTopic).flatMap(r => {
        console.log('redeem response', r);
        const data = JSON.parse(r.message);
        console.log('redeem response', data);
        return swapProcess.depositCoin.extractSecret(data).flatMap(secret => {
          console.log('!! secret !!', secret);
          return swapProcess.receiveCoin.redeem({...data, secret, secretHash: data.secretHash}).map((ra) => {
            console.log('REDEEM: ', swapProcess.receiveCoin.name, ra);
            return new RedeemSuccessAction();
          });

        });
      });
    });


  @Effect()
  informParticipated: Observable<Action> = this.actions$
    .ofType(startAction.INFORM_PARTICIPATED)
    .map(toPayload)
    .withLatestFrom(this.store.select(getInitateLink))
    .mergeMap(([payload, link]) => {
      const d = payload.data;
      const topic = link.replace('=', '').replace('=', '');
      console.log('INFORM PARTICIPATE', '/participate/' + topic, d);
      this.moscaService.sendMsg('/participate/' + topic, JSON.stringify(d));
      return Observable.empty();
    });

  @Effect()
  redeem: Observable<Action> = this.actions$
    .ofType(startAction.WAIT_FOR_PARTICIPATE_SUCCESS)
    .map(toPayload)
    .withLatestFrom(this.store.select(getInitiateData), this.store.select(getSwapCoins), this.store.select(getSwapState), (payload, initData, coins, swapState) => {
      return {
        payload, initData, coins, link: swapState
      }
    })
    .mergeMap((a) => {
      console.log('PARTICIPATE DATA', a);

      let redeemParams = a.payload.redeemParams(a.initData);

      let redeem = a.coins.depositCoin.redeem(redeemParams);

      return redeem.map(r => {

        let informRedeem = {
          secretHash: a.initData.secretHash,
          redeemTx: r.redeemTx,
          contractHex: a.initData.contractHex,
          contractTxHex: a.initData.contractTxHex,
        };

        console.log('about to inform redeemed', informRedeem);
        const redeemTopic = '/redeem/' + a.link.link;

        this.moscaService.sendMsg(redeemTopic, JSON.stringify(informRedeem));
        return new RedeemSuccessAction();
      });
    });


  constructor(private moscaService: MoscaService, private linkService: LinkService,
              private actions$: Actions,
              private store: Store<AppState>,
              private swapService: SwapService, private http: Http) {
  }
}
