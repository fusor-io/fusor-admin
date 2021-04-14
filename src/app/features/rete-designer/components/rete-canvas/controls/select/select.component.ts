import { Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: './select.component.html',
  styles: [
    `
      select {
        border-radius: 30px;
        background-color: white;
        padding: 2px 6px;
        border: 1px solid #999;
        font-size: 110%;
        width: 140px;
        box-sizing: border-box;
      }
    `,
  ],
})
export class SelectNgControl implements OnInit {
  @Input() value!: string;
  @Input() options: string[] = [];
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
