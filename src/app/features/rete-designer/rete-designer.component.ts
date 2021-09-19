import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { cloneDeep } from 'lodash-es';
import { take } from 'rxjs/operators';

import { Definition, DefinitionType } from '../../models';
import { DefinitionFacadeService } from '../../stores/definition';
import { ParamsFacadeService } from '../../stores/params';
import { JsonMap } from '../../type';
import { OpenFlowDialogComponent } from './components/open-flow-dialog/open-flow-dialog.component';
import { SaveFlowDialogComponent } from './components/save-flow-dialog/save-flow-dialog.component';

@Component({
  selector: 'fa-rete-designer',
  templateUrl: './rete-designer.component.html',
  styleUrls: ['./rete-designer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReteDesignerComponent implements OnInit {
  currentFlow: JsonMap | undefined;

  private _currentDefinition!: Partial<Definition>;

  constructor(
    private readonly _definitionFacadeService: DefinitionFacadeService,
    private readonly _paramsFacadeService: ParamsFacadeService,
    private readonly _matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._paramsFacadeService.loadParams();
  }

  open(): void {
    const dialogRef = this._matDialog.open(OpenFlowDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: Definition) => {
        if (result) {
          this._currentDefinition = { ...cloneDeep(result), type: DefinitionType.flow };
          this.currentFlow = this._currentDefinition?.definition;
        }
      });
  }

  save(): void {
    if (this._currentDefinition.key && this._currentDefinition.definition) {
      this._definitionFacadeService.saveDefinition(cloneDeep(this._currentDefinition) as Definition);
    } else {
      const dialogRef = this._matDialog.open(SaveFlowDialogComponent);

      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((result: string) => {
          if (!result) {
            return;
          }

          this._currentDefinition.key = result;
          // TODO implement check for existing
          this._definitionFacadeService.saveDefinition(cloneDeep(this._currentDefinition) as Definition);
        });
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
