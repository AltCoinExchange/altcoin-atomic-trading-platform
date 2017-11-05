import { Component, OnInit, HostBinding } from '@angular/core';

import * as fromSwap from '../../reducers/swap.reducer';
import * as swapSelector from '../../selectors/swap.selector';
import * as swapAction from '../../actions/swap.action';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {flyInOutAnimation} from '../../animations/animations';

@Component({
  selector: 'app-transfer-link',
  templateUrl: './transfer-link.component.html',
  styleUrls: ['./transfer-link.component.scss'],
  animations: [flyInOutAnimation],
})
export class TransferLinkComponent implements OnInit {
  @HostBinding('@flyInOut') state = 'in';
  $link: Observable<string>;

  constructor(private store: Store<fromSwap.State>) {
    this.$link = this.store.select(swapSelector.getLink);
  }

  ngOnInit() {
  }

}
