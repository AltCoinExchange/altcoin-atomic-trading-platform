import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {fadeInAnimation, flyInOutAnimation} from "../../animations/animations";
import {AnimationEnabledComponent} from "../../common/animation.component";
import {AppState} from "../../reducers/app.state";
import {getAStatus} from "../../selectors/side-a.selector";

@Component({
  selector: "app-side-a",
  templateUrl: "./side-a.component.html",
  animations: [flyInOutAnimation, fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideAContainerComponent extends AnimationEnabledComponent implements OnInit {
  $swapStatus: Observable<any>;

  constructor(private store: Store<AppState>) {
    super();
    this.$swapStatus = this.store.select(getAStatus);
  }

  ngOnInit(): void {
  }
}
