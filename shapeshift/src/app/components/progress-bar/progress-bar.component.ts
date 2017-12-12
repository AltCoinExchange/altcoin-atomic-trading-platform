import {Component, ChangeDetectionStrategy, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgFor} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {SwapProgress} from '../../models/swap-progress.enum';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit {
    SwapProgress = SwapProgress;
    @Input() progress : SwapProgress;

    constructor() {    
    }

    ngOnInit() {
      console.log('progress is ', this.progress);
    }

}