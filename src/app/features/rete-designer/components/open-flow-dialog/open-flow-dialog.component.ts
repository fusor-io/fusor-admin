import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DefinitionsFacadeService } from '../../../../stores/definitions';
import { Definition } from './../../../../models/definition.model';

@Component({
  selector: 'fa-open-flow-dialog',
  templateUrl: './open-flow-dialog.component.html',
  styleUrls: ['./open-flow-dialog.component.scss'],
})
export class OpenFlowDialogComponent {
  readonly selectedFlow = new FormControl();

  readonly flows$ = this._definitionsFacadeService.definitions$;

  constructor(private readonly _definitionsFacadeService: DefinitionsFacadeService) {}

  get selected(): Definition | undefined {
    const key: string | null = this.selectedFlow.value;
    if (!key) return undefined;

    return this.flows$.value?.find(flow => flow.key === key);
  }
}
