import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as ownActions from '../actions/params.actions';
import { ParamsApiService } from '../services/params.service';

@Injectable()
export class ParamsStoreEffects {
  loadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ownActions.loadParams),
      switchMap(() =>
        this._paramsService.load().pipe(
          map(data => ownActions.loadParamsSuccess({ data })),
          catchError(error => of(ownActions.loadParamsFailed({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private readonly _paramsService: ParamsApiService,
    private readonly actions$: Actions,
  ) {}
}
