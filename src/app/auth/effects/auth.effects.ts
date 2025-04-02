import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, finalize, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { loginAction, loginActionSuccess, loginActionFailure } from '../actions';
import { SharedService } from 'src/app/Services/shared.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  responseOK = false;
  errorResponse: any;
  
  constructor(private actions$: Actions, private authService: AuthService, private sharedService: SharedService, private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      mergeMap(action =>
        this.authService.login(action.userForm).pipe(
          map(response => loginActionSuccess({ user_id: response.user_id, access_token: response.access_token })), 
          catchError(error => of(loginActionFailure({ payload: error }))),
          finalize(async () =>{
            await this.sharedService.managementToast(
              'loginFeedback',
              this.responseOK,
                this.errorResponse
            );

            if(this.responseOK == true) this.router.navigateByUrl('home');
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActionSuccess),
      map(action => {
        this.responseOK = true;
      })
    ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActionFailure),
      map(action => {
        this.responseOK = false;
        this.errorResponse = action.payload.error;
        this.sharedService.errorLog(this.errorResponse);
      })
    ),
    { dispatch: false }
  );

}