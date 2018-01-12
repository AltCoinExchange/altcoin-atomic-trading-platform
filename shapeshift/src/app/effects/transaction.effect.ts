import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as transactionAction from '../actions/transaction.action';
import {TransactionService} from '../services/transaction.service';
import {ShapeshiftStorage} from "../common/shapeshift-storage";
import {AccountHelperService} from "../services/account-helper.service";


@Injectable()
export class TransactionEffect {
  private ethWallet: any;
  private ethInstance: any;
  private btcWallet: any;
  private btcInstance: any;

  @Effect()
  loadTransactions$: Observable<Action> = this.actions$
    .ofType(transactionAction.LOAD_TRANSACTION)
    .flatMap(() => {
        this.init();
        const address = this.ethWallet.address;
        return this.transactionService.getTransactions(address)
          .map(transactions => new transactionAction.LoadTransactionSuccessAction(transactions));
      },
    );

  private init() {
    const xprivKey = ShapeshiftStorage.get("btcprivkey");
    if (xprivKey) {
      const {ethInstance, ethWallet, btcWallet, btcInstance} = this.accountService.generateWalletsFromPrivKey();
      this.ethInstance = ethInstance;
      this.ethWallet = ethWallet;
      this.btcInstance = btcInstance;
      this.btcWallet = btcWallet;
    }
  }

  constructor(private transactionService: TransactionService,
              private accountService: AccountHelperService,
              private actions$: Actions) {
  }
}
