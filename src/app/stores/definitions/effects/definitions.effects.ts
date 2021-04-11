import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as ownActions from '../actions/definitions.actions';
import { DefinitionsApiService } from '../services/definitions.service';

@Injectable()
export class DefinitionsStoreEffects {
  loadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ownActions.loadDefinitions),
      switchMap(({ query }) =>
        this._definitionsService.load(query).pipe(
          map(data => ownActions.loadDefinitionsSuccess({ data })),
          catchError(error => of(ownActions.loadDefinitionsFailed({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private readonly _definitionsService: DefinitionsApiService,
    private readonly actions$: Actions,
  ) {}
}
