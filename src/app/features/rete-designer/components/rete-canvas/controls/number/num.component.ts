import { Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: 'num.component.html',
  styleUrls: ['num.component.scss'],
})
export class NumberNgControl implements OnInit {
  @Input() value!: number;
  @Input() hint!: string;
  @Input() readonly!: boolean;
  
  @Input() change!: Function;
  @Input() mounted!: Function;

  ngOnInit() {
    this.mounted();
  }

  _change(event: Event): void {
    this.change(+(<HTMLInputElement>event.target).value);
  }
}
