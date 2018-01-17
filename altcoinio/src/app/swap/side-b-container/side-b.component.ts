import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {AppState} from "../../reducers/app.state";
import {getBProgress} from "../../selectors/side-b.selector";

@Component({
  selector: "app-side-b",
  templateUrl: "./side-b.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBContainerComponent implements OnInit {
  $swapProgress: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.$swapProgress = this.store.select(getBProgress);
  }

  ngOnInit(): void {
  }
}
