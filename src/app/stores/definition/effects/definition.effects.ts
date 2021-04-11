import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as ownActions from '../actions/definition.actions';
import { DefinitionApiService } from '../services/definition.service';

@Injectable()
export class DefinitionStoreEffects {
  loadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ownActions.loadDefinition),
      switchMap(({ query }) =>
        this._definitionService.load(query).pipe(
          map(data => ownActions.loadDefinitionSuccess({ data })),
          catchError(error => of(ownActions.loadDefinitionFailed({ error }))),
        ),
      ),
    ),
  );

  saveEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ownActions.saveDefinition),
      switchMap(({ data }) =>
        this._definitionService.save(data).pipe(
          map(() => ownActions.saveDefinitionSuccess()),
          catchError(error => of(ownActions.loadDefinitionFailed({ error }))),
        ),
      ),
    ),
  );

  constructor(private readonly _definitionService: DefinitionApiService, private readonly actions$: Actions) {}
}
