import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { uniq } from 'lodash-es';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { filterDefined } from 'src/app/utils/operators';

import { NodeParamValues } from '../../../models';
import { loadParams } from '../actions/params.actions';
import { selectError, selectInProgress, selectParams } from '../selectors/params.selectors';
import { State } from '../type';

@Injectable({ providedIn: 'root' })
export class ParamsFacadeService {
  readonly params$ = new BehaviorSubject<NodeParamValues>([]);
  readonly nodeList$ = new BehaviorSubject<string[]>([]);

  readonly inProgress$ = this._store.pipe(select(selectInProgress));
  readonly error$ = this._store.pipe(select(selectError));

  constructor(private readonly _store: Store<State>) {
    this._store.pipe(select(selectParams), filterDefined()).subscribe(this.params$);
    this.params$
      .pipe(
        map(params => (params || []).map(param => param.node)),
        map(params => uniq(params)),
      )
      .subscribe(this.nodeList$);
  }

  get nodes(): string[] {
    return this.nodeList$.value;
  }

  params(nodeId: string): string[] {
    return this.params$.value.filter(param => param.node === nodeId).map(param => param.param);
  }

  loadParams(): void {
    this._store.dispatch(loadParams());
  }
}
