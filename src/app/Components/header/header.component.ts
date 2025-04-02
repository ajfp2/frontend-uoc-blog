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
  private user_id: string = '';

  constructor( private router: Router, private store: Store<AppState>) {    
    this.showAuthSection = false;
    this.showNoAuthSection = true;
    console.log("STORE HEADER CONSTR", this.user_id);
    
  }

  ngOnInit(): void {
    this.store.select('authApp').subscribe( respuesta => {
      this.user_id = respuesta.credentials.user_id;
      console.log("STORE HEADER INIT", this.user_id);
      
      if(this.user_id !== ""){
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
