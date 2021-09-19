import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fa-save-flow-dialog',
  templateUrl: './save-flow-dialog.component.html',
  styleUrls: ['./save-flow-dialog.component.scss'],
})
export class SaveFlowDialogComponent {
  slug = new FormControl();

  get data(): string {
    return ((this.slug.value as string) || '').trim().toLowerCase();
  }
}
