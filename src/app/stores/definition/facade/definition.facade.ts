import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Definition } from '../../../models';
import { filterDefined } from '../../../utils/operators';
import { loadDefinition, saveDefinition } from '../actions/definition.actions';
import { selectDefinition, selectError, selectInProgress } from '../selectors/definition.selectors';
import { DefinitionQuery, State } from '../type';

@Injectable({ providedIn: 'root' })
export class DefinitionFacadeService {
  readonly definition$ = this._store.pipe(select(selectDefinition), filterDefined());
  readonly inProgress$ = this._store.pipe(select(selectInProgress));
  readonly error$ = this._store.pipe(select(selectError));

  constructor(private readonly _store: Store<State>) {}

  loadDefinition(query: DefinitionQuery): void {
    this._store.dispatch(loadDefinition({ query }));
  }

  saveDefinition(data: Definition): void {
    this._store.dispatch(saveDefinition({ data }));
  }
}
