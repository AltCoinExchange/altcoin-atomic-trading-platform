import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as quoteAction from './actions/quote.action';
import { AppState } from './reducers/app.state';
import {AccountHelper} from "./common/account-helper";


@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public altcoinLogo = 'assets/icon/altcoin-icon.png';
  headerHidden = false;
  private didScroll = false;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new quoteAction.LoadQuoteAction());
    AccountHelper.generateWalletsFromPrivKey(this.store);
  }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event) {
    this.didScroll = true;
  }

  public ngOnInit() {
    this.hideHeaderOnScroll();
  }

  private hideHeaderOnScroll() {
    let lastScrollTop = 0;
    const delta = 5;
    const navbarHeight = 60;
    setInterval(() => {
      if (this.didScroll) {
        const st = window.scrollY;
        if (Math.abs(lastScrollTop - st) <= delta) {
          return;
        }
        this.headerHidden = st > lastScrollTop && st > navbarHeight;
        lastScrollTop = st;
        this.didScroll = false;
      }
    }, 250);
  }
}
