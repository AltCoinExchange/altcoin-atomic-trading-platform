import {Component, HostListener, OnInit} from "@angular/core";
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {LogoutDialogComponent} from "../logout-dialog/logout-dialog.component";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

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

  hasAcc = AltcoinioStorage.get("btcprivkey");

  constructor(private router: Router, private dialog: MatDialog) {
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

  logout() {
    const logoutRef = this.dialog.open(LogoutDialogComponent);
    logoutRef.afterClosed().filter(result => result).subscribe(result => {
      localStorage.clear();
      this.router.navigate(["/wallet/empty"]);
    });
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
