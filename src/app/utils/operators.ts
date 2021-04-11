import { isEqual } from 'lodash-es';
import { MonoTypeOperatorFunction, Observable, pipe } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

export function distinctObjects<T = any>(): MonoTypeOperatorFunction<T> {
  return pipe(distinctUntilChanged((a, b) => isEqual(a, b)));
}

export function filterDefined<T>() {
  return (source$: Observable<T | undefined>) =>
    source$.pipe(
      filter(item => item !== undefined),
      map(item => item as T),
    );
}
