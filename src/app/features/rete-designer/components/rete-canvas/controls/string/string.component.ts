import { Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: './string.component.html',
  styles: [
    `
      input {
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
export class StringNgControl implements OnInit {
  @Input() value!: string;
  @Input() readonly!: boolean;
  @Input() change!: Function;
  @Input() mounted!: Function;
  @Input() hint!: string;
  
  constructor(){
    
  }
  
  ngOnInit() {
    console.log({ value: this.value, hint: this.hint });
    this.mounted();
  }

  _change(event: Event): void {
    this.change((<HTMLInputElement>event.target).value);
  }
}
