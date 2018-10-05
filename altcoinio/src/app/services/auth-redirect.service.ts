import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {AccountHelper} from "../common/account-helper";
import {Go} from "../actions/router.action";
import {AltcoinioStorage} from "../common/altcoinio-storage";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    if (xprivKey) {
      return true;
    } else {
        this.router.navigate(['/wallet/empty']);
        return false;
    }
  }
}
