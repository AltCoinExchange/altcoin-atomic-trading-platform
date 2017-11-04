import { Component, OnInit } from '@angular/core';

import * as fromSwap from '../../reducers/start.reducer';
import * as swapSelector from '../../selectors/start.selector';
import * as swapAction from '../../actions/start.action';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-transfer-link',
  templateUrl: './transfer-link.component.html',
  styleUrls: ['./transfer-link.component.scss']
})
export class TransferLinkComponent implements OnInit {

  $link: Observable<string>;

  constructor(private store: Store<fromSwap.State>) {
    this.$link = this.store.select(swapSelector.getLink);
  }

  ngOnInit() {
  }

}
