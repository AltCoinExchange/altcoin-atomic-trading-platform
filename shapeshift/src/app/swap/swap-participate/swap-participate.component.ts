import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/app.state';
import {SwapAuditAction} from '../../actions/swap-audit.action';
import * as fromSwap from '../../selectors/swap.selector';
import * as swapAction from '../../actions/swap.action';
import * as startAction from '../../actions/start.action';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-swap-participate',
  templateUrl: './swap-participate.component.html',
  styleUrls: ['./swap-participate.component.scss'],
})
export class SwapParticipateComponent implements OnInit {
  private routeSub: Subscription;

  contractHex;
  contractTxHex;

  $auditData: Observable<any>;
  $auditLoading: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.routeSub = this.route.params.subscribe(params => {
      const link = params['link'];
      const strinigiedData = atob(link);
      const data = JSON.parse(strinigiedData);

      const [contractHex, contractTxHex] = data;
      this.contractHex = contractHex;
      this.contractTxHex = contractTxHex;

      this.store.dispatch(new SwapAuditAction({contractHex, contractTxHex}));
    });

    this.$auditData = this.store.select(fromSwap.getAuditData);
    this.$auditLoading = this.store.select(fromSwap.getAuditLoading);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
