import {Component, ChangeDetectionStrategy, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgFor} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromSwap from '../../reducers/start.reducer';
import * as swapSelector from '../../selectors/start.selector';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit {

    $activeStep: Observable<number>;
    steps = [
        { value: 1, title: 'Deposit'}, 
        { value: 2, title: 'Confirmation' }, 
        { value: 3, title: 'Swap'}
    ];

    constructor(private store: Store<fromSwap.State>) {
        this.$activeStep = this.store.select(swapSelector.getActiveStep);
    }

    ngOnInit() {
    }


}