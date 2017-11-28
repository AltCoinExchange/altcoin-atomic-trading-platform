import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {fadeInAnimation, flyInOutAnimation} from "../../animations/animations";
import {AnimationEnabledComponent} from "../../common/animation.component";
import {AppState} from "../../reducers/app.state";
import {getBStatus} from "../../selectors/side-b.selector";

@Component({
  selector: "app-side-b",
  templateUrl: "./side-b.component.html",
  animations: [flyInOutAnimation, fadeInAnimation],
})
export class SideBContainerComponent extends AnimationEnabledComponent implements OnInit {
  $swapStatus: Observable<any>;

  constructor(private store: Store<AppState>) {
    super();
    this.$swapStatus = this.store.select(getBStatus);
  }

  ngOnInit(): void {
  }
}
