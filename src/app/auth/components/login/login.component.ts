import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { AuthDTO } from 'src/app/auth/models/auth.dto';

import { loginAction } from '../../actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: AuthDTO;
  email: UntypedFormControl;
  password: UntypedFormControl;
  loginForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store<AppState>
  ) {
    // this.loginUser = new AuthDTO('', '', '', '');
    this.loginUser = new AuthDTO("", "", "ajfp2@uoc.edu", "ajfp21234");

    this.email = new UntypedFormControl(this.loginUser.email, [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$') ]);

    this.password = new UntypedFormControl(this.loginUser.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  login(){
    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;
    this.store.dispatch(loginAction({userForm: this.loginUser}));
  }

  /*
  loginOLD(){
    let responseOK: boolean = false;
    let errorResponse: any;
    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;

    this.authService.login(this.loginUser).pipe(
      finalize(async() => {
        await this.sharedService.managementToast(
            'loginFeedback',
            responseOK,
            errorResponse
        );
        if (responseOK) {
            const headerInfo: HeaderMenus = {
                showAuthSection: true,
                showNoAuthSection: false,
            };
            // update options menu
            this.headerMenusService.headerManagement.next(headerInfo);
            this.router.navigateByUrl('home');
        }
      })
    ).subscribe((resp: any) => {
        responseOK = true;           
        this.loginUser = resp;

        // save token to localstorage for next requests
        this.localStorageService.set('user_id', this.loginUser.user_id);
        this.localStorageService.set('access_token', this.loginUser.access_token);                
    },
    (error: HttpErrorResponse) => {
        responseOK = false;
        console.error("ERROR LOGIN", error);            
        errorResponse = error.error;
        const headerInfo: HeaderMenus = {
            showAuthSection: false,
            showNoAuthSection: true,
        };
        this.headerMenusService.headerManagement.next(headerInfo);
        this.sharedService.errorLog(error.error);        
    });
    console.log('just after subscribe LOGIN');
  }*/
}
