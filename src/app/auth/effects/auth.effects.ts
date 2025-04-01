import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { loginAction, loginActionSuccess, loginActionFailure } from '../actions';
import { SharedService } from 'src/app/Services/shared.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private sharedService: SharedService, private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      mergeMap(action =>
        this.authService.login(action.userForm).pipe(
          map(response => loginActionSuccess({ user_id: response.user_id, access_token: response.access_token })), 
          catchError(error => of(loginActionFailure({ payload: error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActionSuccess),
      tap(async action => {
        let errorResponse: any;
        await this.sharedService.managementToast(
          'loginFeedback',
            true,
            errorResponse
        );
        console.log("Action", action);
        
        this.router.navigateByUrl('home');
      })
    ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActionFailure),
      tap(async action => {
        await this.sharedService.managementToast(
          'loginFeedback',
            false,
            action.payload
        );
      })
    ),
    { dispatch: false }
  );

}