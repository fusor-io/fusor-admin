import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { uniq } from 'lodash-es';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { NodeParamValues } from '../../../models';
import { distinctObjects, filterDefined } from '../../../utils/operators';
import { loadParams } from '../actions/params.actions';
import { selectError, selectInProgress, selectParams } from '../selectors/params.selectors';
import { State } from '../type';

@Injectable({ providedIn: 'root' })
export class ParamsFacadeService {
  readonly nodeList$ = new BehaviorSubject<string[]>([]);

  readonly inProgress$ = this._store.pipe(select(selectInProgress));
  readonly error$ = this._store.pipe(select(selectError));

  private readonly _params$ = new BehaviorSubject<NodeParamValues>([]);
  readonly params$ = this._params$.pipe(distinctObjects());

  constructor(private readonly _store: Store<State>) {
    this._store.pipe(select(selectParams), filterDefined()).subscribe(this._params$);
    this._params$
      .pipe(
        map(params => (params || []).map(param => param.node)),
        map(params => uniq(params)),
        distinctObjects(),
      )
      .subscribe(this.nodeList$);

    // reload each 5 sec
    // TODO: refactor this when hub will provide socket connection with live updates
    setInterval(() => this.loadParams(), 5000);
  }

  get nodes(): string[] {
    return this.nodeList$.value;
  }

  params(nodeId: string): string[] {
    return this._params$.value.filter(param => param.node === nodeId).map(param => param.param);
  }

  value(nodeId: string, paramId: string): number {
    return this._params$.value?.find(item => item.node === nodeId && item.param === paramId)?.value || NaN;
  }

  loadParams(): void {
    this._store.dispatch(loadParams());
  }
}
