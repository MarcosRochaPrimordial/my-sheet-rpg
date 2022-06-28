import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
})
export class CharacteristicsComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  inputLenght: number = 90;

  get strength() {
    return this.formGroup.get('strength') as FormControl;
  }

  get hability() {
    return this.formGroup.get('hability') as FormControl;
  }

  get endurance() {
    return this.formGroup.get('endurance') as FormControl;
  }

  get harness() {
    return this.formGroup.get('harness') as FormControl;
  }

  get firePower() {
    return this.formGroup.get('firePower') as FormControl;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
