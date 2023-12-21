import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';

import * as UserActions from '../actions/user.actions';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  doLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.login.type),
      map(() => {
        return UserActions.loginSuccess();
      })
    );
  });

  doLoginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.loginSuccess.type),
        tap(() => this.router.navigate(['/']))
      );
    },
    { dispatch: false }
  );

  doLoginOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.logout.type),
        tap(() => this.router.navigate(['/login']))
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router
  ) {}
}
