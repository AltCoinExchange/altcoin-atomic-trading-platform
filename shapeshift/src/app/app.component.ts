import {Component, ViewEncapsulation} from "@angular/core";
import {Store} from "@ngrx/store";
import * as quoteAction from "./actions/quote.action";
import {AppState} from "./reducers/app.state";


@Component({
  selector: "app-comp",
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    "./app.component.scss"
  ],
  templateUrl: "./app.component.html"
})
export class AppComponent {

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new quoteAction.LoadQuoteAction());
  }
}
