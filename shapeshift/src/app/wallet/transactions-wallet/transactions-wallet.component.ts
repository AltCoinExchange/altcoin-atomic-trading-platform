import {Component, Input, OnInit} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Observable} from "rxjs/Observable";
import {TransactionModel} from "../../models/transaction.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import {GetEthBalanceAction} from "../../actions/balance.action";
import {LoadTransactionAction} from "../../actions/transaction.action";
import {getETHBalance} from "../../selectors/balance.selector";
import {getTransactions} from "../../selectors/transaction.selector";

@Component({
  selector: 'app-transactions-wallet',
  templateUrl: './transactions-wallet.component.html',
  styleUrls: ['./transactions-wallet.component.scss']
})
export class TransactionsWalletComponent implements OnInit {
  @Input() address;
  @Input() $transactions: Observable<TransactionModel>;
  public $from: Observable<Array<any>>;
  public $to: Observable<Array<any>>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadTransactionAction());
    this.$transactions = this.store.select(getTransactions);
    // this.getEthBalance().subscribe();
  }
}
