import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { logoutAction } from 'src/app/auth/actions';
import { AuthDTO } from 'src/app/auth/models/auth.dto';
import { AuthState } from 'src/app/auth/reducers';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showAuthSection: boolean;
  showNoAuthSection: boolean;
  //userAuth$: Observable<AuthDTO | null>;
  userAuth: AuthDTO;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private headerMenusService: HeaderMenusService,
    //private localStorageService: LocalStorageService
  ) {
    // this.userAuth$ = this.store.select('credentials');
    this.userAuth = new AuthDTO('', '', '', '');
    this.showAuthSection = false;
    this.showNoAuthSection = true;    
  }

  ngOnInit(): void {
    
    this.store.select('authApp').subscribe( respuesta => {
      this.userAuth = respuesta.credentials;
      if(this.userAuth.user_id !== ""){
        this.showAuthSection = true;
        this.showNoAuthSection = false;
      } else {
        this.showAuthSection = false;
        this.showNoAuthSection = true;
      }
    });
  }

  dashboard(): void {
    this.router.navigateByUrl('dashboard');
  }

  home(): void {
    this.router.navigateByUrl('home');
  }

  login(): void {
    this.router.navigateByUrl('login');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

  adminPosts(): void {
    this.router.navigateByUrl('posts');
  }

  adminCategories(): void {
    this.router.navigateByUrl('categories');
  }

  profile(): void {
    this.router.navigateByUrl('profile');
  }

  logout(): void {
    this.store.dispatch(logoutAction());
    this.router.navigateByUrl('home');
  }
}
