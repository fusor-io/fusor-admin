import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReteModule } from 'rete-angular-render-plugin';

import { NumberNgControl } from './components/rete-canvas/controls/number/num.component';
import { ReteCanvasComponent } from './components/rete-canvas/rete-canvas.component';
import { ReteDesignerComponent } from './rete-designer.component';

const routes: Routes = [
  {
    path: '',
    component: ReteDesignerComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReteModule],
  declarations: [ReteCanvasComponent, ReteDesignerComponent, NumberNgControl],
  exports: [ReteModule, ReteDesignerComponent],
})
export class ReteDesignerModule {}
