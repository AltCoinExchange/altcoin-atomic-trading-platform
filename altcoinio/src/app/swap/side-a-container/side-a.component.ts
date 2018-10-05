import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {AppState} from "../../reducers/app.state";
import {getAProgress} from "../../selectors/side-a.selector";

@Component({
  selector: "app-side-a",
  templateUrl: "./side-a.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideAContainerComponent implements OnInit {
  $swapProgress: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.$swapProgress = this.store.select(getAProgress);
  }

  ngOnInit(): void {
  }
}
