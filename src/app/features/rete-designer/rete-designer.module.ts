import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { ReteModule } from 'rete-angular-render-plugin';

import { DefinitionServiceModule } from '../../stores/definition';
import { DefinitionsServiceModule } from '../../stores/definitions';
import { ParamsServiceModule } from '../../stores/params';
import { OpenFlowDialogComponent } from './components/open-flow-dialog/open-flow-dialog.component';
import { NumberNgControl } from './components/rete-canvas/controls/number/num.component';
import { SelectNgControl } from './components/rete-canvas/controls/select/select.component';
import { StringNgControl } from './components/rete-canvas/controls/string/string.component';
import { ReteCanvasComponent } from './components/rete-canvas/rete-canvas.component';
import { ReteDesignerComponent } from './rete-designer.component';

const routes: Routes = [
  {
    path: '',
    component: ReteDesignerComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    ReteModule,
    DefinitionServiceModule,
    DefinitionsServiceModule,
    ParamsServiceModule,
  ],
  declarations: [
    ReteCanvasComponent,
    ReteDesignerComponent,
    OpenFlowDialogComponent,
    NumberNgControl,
    StringNgControl,
    SelectNgControl,
    OpenFlowDialogComponent,
  ],
  exports: [ReteModule, ReteDesignerComponent],
})
export class ReteDesignerModule {}
