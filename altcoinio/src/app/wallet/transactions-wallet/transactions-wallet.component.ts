import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers/app.state";
import {LoadTransactionAction} from "../../actions/transaction.action";
import {getTransactions} from "../../selectors/transaction.selector";
import {TransactionState} from "../../reducers/transaction.reducer";
import {DataSource} from "@angular/cdk/collections";
import {Element, OrderDataSource} from "../../swap/swap-container/swap-container.component";
import {OrderService} from "../../services/order.service";
import {TransactionService} from "../../services/transaction.service";
import {TransactionDetailsModel, TransactionModel} from "../../models/transaction.model";

@Component({
  selector: 'app-transactions-wallet',
  templateUrl: './transactions-wallet.component.html',
  styleUrls: ['./transactions-wallet.component.scss']
})
export class TransactionsWalletComponent implements OnInit {
  @Input() address;
  public dataSource;
  public displayedColumns = ["from", "to", "value"];
  detailsClosed;

  constructor(private store: Store<AppState>, public transactionService: TransactionService) {
    this.detailsClosed = true;
  }

  ngOnInit() {
    this.dataSource = new TransactionsDataSource(this.transactionService, this.address);
  }

  openDetails(){
    this.detailsClosed = !this.detailsClosed;
  }
}

export class TransactionsDataSource extends DataSource<any> {

  constructor(private transactionService: TransactionService, private address: string) {
    super();
  }

  connect(): Observable<TransactionDetailsModel[]> {
    const addr = "0x" + this.address.toLowerCase();
    return this.transactionService.getTransactions(this.address)
      .map(data => {
        let details = data.from.concat(data.to) as TransactionDetailsModel[];
        console.log(details);
        details = details.filter((e, index, arr) => {
          e.value = (parseFloat(e.value) / 1000000000000000000).toString() + " ETH";
          if (e.from.toLowerCase() == addr) {
            e.from = "ME";
            return true;
          } else if (e.to.toLowerCase() == addr) {
            e.to = "ME";
            return true;
          } else {
            return false;
          }
        });

        return details;
      });
  }

  disconnect() {
  }
}

