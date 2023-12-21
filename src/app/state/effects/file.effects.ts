import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as FileActions from '../actions/file.actions';
import { map } from 'rxjs';

@Injectable()
export class FileEffects {
  addFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.addFile.type),
      map(() => {
        return FileActions.uploadFinished();
      })
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router
  ) {}
}
