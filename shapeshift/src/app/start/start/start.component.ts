import {Component, HostListener, OnInit} from "@angular/core";
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Component({
  selector: "app",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.scss"]
})
export class StartComponent implements OnInit {
  public altcoinLogo = "assets/icon/altcoin-icon.png";
  headerHidden = false;
  routerLoading;
  private didScroll = false;

  constructor(private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        this.routerLoading = true;
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.routerLoading = false;
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        this.routerLoading = false;
      }
      if (event instanceof NavigationCancel) {
        // Hide loading indicator
        // Present error to user
        this.routerLoading = false;
      }
    });
  }


  @HostListener("window:scroll", ["$event"])
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
