import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {fadeInAnimation, flyInOutAnimation} from "../../animations/animations";
import {AnimationEnabledComponent} from "../../common/animation.component";

@Component({
  selector: "app-side-a",
  templateUrl: "./side-a.component.html",
  animations: [flyInOutAnimation, fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideAContainerComponent extends AnimationEnabledComponent implements OnInit {


  ngOnInit(): void {
  }
}
