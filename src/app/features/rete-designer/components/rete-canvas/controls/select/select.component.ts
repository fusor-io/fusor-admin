import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './select.component.html',
  styleUrls: ['select.component.scss'],
})
export class SelectNgControl implements OnInit {
  @Input() value!: string;
  @Input() options$!: Observable<string[]>;
  @Input() readonly!: boolean;

  @Input() change!: Function;
  @Input() mounted!: Function;

  ngOnInit() {
    this.mounted();
  }

  _change(value: string): void {
    this.change(value);
  }
}
