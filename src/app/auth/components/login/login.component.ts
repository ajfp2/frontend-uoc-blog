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
import { transition, trigger, state, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void',
        style({
          opacity: 0.2,
        })
      ),
      transition('void <=> *', animate(1500)),
    ]),
  ]
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
}
