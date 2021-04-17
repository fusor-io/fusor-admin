import { Type } from '@angular/core';
import { Control, NodeEditor } from 'rete';
import { AngularControl } from 'rete-angular-render-plugin';
import { BehaviorSubject, Observable } from 'rxjs';

import { SelectNgControl } from './select.component';

export class SelectControl extends Control implements AngularControl {
  component: Type<SelectNgControl>;
  props: Record<string, unknown>;
  selectedValue$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    public readonly emitter: NodeEditor,
    public readonly key: string,
    options$: Observable<string[]>,
    readonly = false
  ) {
    super(key);

    this.component = SelectNgControl;
    this.props = {
      readonly,
      options$,
      value: '',
      change: (value: string) => this.onChange(value),
      mounted: () => this.setValue(String(this.getData(key) || '')),
    };
  }

  onChange(value: string) {
    this.setValue(value);
    this.emitter.trigger('process');
  }
  
  setValue(value: string) {
    this.selectedValue$.next(value);
    this.props.value = value;
    this.putData(this.key, this.props.value);
  }
}
