import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../Services/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  access_token: string | null = '';
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {

    this.store.select('authApp').subscribe( resp => {
      this.access_token = resp.credentials.access_token;
    });

  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
  
    if (this.access_token !== '') {
      // logged in so return true
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}
