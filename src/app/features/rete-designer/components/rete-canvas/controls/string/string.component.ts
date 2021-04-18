import { Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: './string.component.html',
  styleUrls: ['string.component.scss'],
})
export class StringNgControl implements OnInit {
  @Input() value!: string;
  @Input() hint!: string;
  @Input() readonly!: boolean;
  
  @Input() change!: Function;
  @Input() mounted!: Function;

  ngOnInit() {
    this.mounted();
  }

  _change(event: Event): void {
    this.change((<HTMLInputElement>event.target).value);
  }
}
