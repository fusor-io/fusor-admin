import { Type } from '@angular/core';
import { Control, NodeEditor } from 'rete';
import { AngularControl } from 'rete-angular-render-plugin';

import { StringNgControl } from './string.component';

export class StringControl extends Control implements AngularControl {
  component: Type<StringNgControl>;
  props: Record<string, unknown>;

  constructor(
    public emitter: NodeEditor,
    public key: string,
    hint = '',
    readonly = false
  ) {
    super(key);

    this.component = StringNgControl;
    this.props = {
      readonly,
      change: (value: string) => this.onChange(value),
      value: '',
      mounted: () => this.setValue(String(this.getData(key) || '')),
      hint,
    };
  }

  onChange(value: string) {
    this.setValue(value);
    this.emitter.trigger('process');
  }

  setValue(value: string) {
    this.props.value = value;
    this.putData(this.key, this.props.value);
  }
}
