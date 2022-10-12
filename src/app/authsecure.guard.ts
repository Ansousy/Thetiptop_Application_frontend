import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {isNull} from "util";
import {TokenStorageService} from "./auth/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthsecureGuard implements CanActivate {
  constructor(
    private router: Router,
    public tokenstorage:TokenStorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    const isLoggedIn = !isNull(this.tokenstorage.getToken());
    if (isLoggedIn) {
      const userRole = this.tokenstorage.getAuthorities()[0];
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        //window.sessionStorage.clear();
        window.location.replace('/auth/acces-refuse');
        return false;
      }

      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }

}

