import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent {

  @Input() label: string = '';
  @Input() formField!: FormControl;
  @Input() allowNegative: boolean = true;
  @Input() verticalAlign: boolean = false;

  constructor() { }

  up() {
    this.formField.setValue((!!this.formField.value ? this.formField.value : 0) + 1);
  }

  down() {
    if (!this.allowNegative && this.formField?.value === 0) {
      return;
    }
    this.formField.setValue((!!this.formField.value ? this.formField.value : 0) - 1);
  }
}
