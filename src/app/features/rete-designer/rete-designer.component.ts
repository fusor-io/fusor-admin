import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { cloneDeep } from 'lodash-es';

import { Definition, DefinitionType } from '../../models';
import { DefinitionFacadeService } from '../../stores/definition';
import { DefinitionsFacadeService } from '../../stores/definitions';
import { ParamsFacadeService } from '../../stores/params';
import { JsonMap } from '../../type';
import { OpenFlowDialogComponent } from './components/open-flow-dialog/open-flow-dialog.component';

@Component({
  selector: 'fa-rete-designer',
  templateUrl: './rete-designer.component.html',
  styleUrls: ['./rete-designer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReteDesignerComponent implements OnInit {
  readonly flows$ = this._definitionsFacadeService.definitions$;

  currentFlow: JsonMap | undefined;

  private _currentDefinition!: Partial<Definition>;

  constructor(
    private readonly _definitionsFacadeService: DefinitionsFacadeService,
    private readonly _definitionFacadeService: DefinitionFacadeService,
    private readonly _paramsFacadeService: ParamsFacadeService,
    private readonly _matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._definitionsFacadeService.loadDefinitions({ type: DefinitionType.flow });
    this._paramsFacadeService.loadParams();
  }

  open(): void {
    const dialogRef = this._matDialog.open(OpenFlowDialogComponent);

    dialogRef.afterClosed().subscribe((result: Definition) => {
      if (result) {
        this._currentDefinition = { ...cloneDeep(result), type: DefinitionType.flow };
        this.currentFlow = this._currentDefinition?.definition;
      }
    });
  }

  save(): void {
    if (this._currentDefinition.key && this._currentDefinition.definition) {
      this._definitionFacadeService.saveDefinition(this._currentDefinition as Definition);
    } else {
      // TODO add processing for new definition
      console.log({ new: this._currentDefinition });
    }
  }

  new(): void {
    this._currentDefinition = { type: DefinitionType.flow };
    this.currentFlow = this._currentDefinition?.definition;
  }

  onUpdate(data: JsonMap): void {
    if (!this._currentDefinition) this._currentDefinition = { type: DefinitionType.flow };
    this._currentDefinition.definition = data;
  }
}
