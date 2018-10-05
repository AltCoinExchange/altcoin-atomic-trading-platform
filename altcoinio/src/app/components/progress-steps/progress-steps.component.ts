import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import * as fromSwap from "../../reducers/start.reducer";
import * as swapSelector from "../../selectors/start.selector";

@Component({
  selector: "progress-steps",
  templateUrl: "./progress-steps.component.html",
  styleUrls: ["./progress-steps.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressStepsComponent implements OnInit {

  $activeStep: Observable<number>;
  steps = [
    {value: 1, title: "Deposit"},
    {value: 2, title: "Confirmation"},
    {value: 3, title: "Swap"}
  ];

  constructor(private store: Store<fromSwap.State>) {
    this.$activeStep = this.store.select(swapSelector.getActiveStep);
  }

  ngOnInit() {
  }


}
