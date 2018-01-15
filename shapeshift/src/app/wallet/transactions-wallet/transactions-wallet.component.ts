import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import {LoadTransactionAction} from "../../actions/transaction.action";
import {getTransactions} from "../../selectors/transaction.selector";
import {TransactionState} from "../../reducers/transaction.reducer";

@Component({
  selector: 'app-transactions-wallet',
  templateUrl: './transactions-wallet.component.html',
  styleUrls: ['./transactions-wallet.component.scss']
})
export class TransactionsWalletComponent implements OnInit {
  @Input() address;
  public $transactions: Observable<TransactionState>;
  public $from: Observable<Array<any>>;
  public $to: Observable<Array<any>>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadTransactionAction());
    this.$transactions = this.store.select(getTransactions);
  }
}
