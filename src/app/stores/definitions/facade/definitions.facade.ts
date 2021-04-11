import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import { Definitions } from '../../../models';
import { loadDefinitions } from '../actions/definitions.actions';
import { selectDefinitions, selectError, selectInProgress } from '../selectors/definitions.selectors';
import { DefinitionsQuery, State } from '../type';

@Injectable({ providedIn: 'root' })
export class DefinitionsFacadeService {
  readonly definitions$ = new BehaviorSubject<Definitions | undefined>(undefined);
  readonly inProgress$ = this._store.pipe(select(selectInProgress));
  readonly error$ = this._store.pipe(select(selectError));

  constructor(private readonly _store: Store<State>) {
    // Convert Observable into BehaviorSubject
    // BehaviorSubject will emit the last value to all new subscribers,
    this._store.pipe(select(selectDefinitions)).subscribe(this.definitions$);
  }

  loadDefinitions(query: DefinitionsQuery): void {
    this._store.dispatch(loadDefinitions({ query }));
  }
}
