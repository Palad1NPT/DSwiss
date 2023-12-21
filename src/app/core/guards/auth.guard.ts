import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserLoggedIn } from '../../state/reducers/user.reducer';
import { map } from 'rxjs';

export const authGuard = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUserLoggedIn).pipe(
    map((isLogged: boolean) => {
      if (!isLogged) {
        router.navigate(['/login']);
      }
      return isLogged;
    })
  );
};
