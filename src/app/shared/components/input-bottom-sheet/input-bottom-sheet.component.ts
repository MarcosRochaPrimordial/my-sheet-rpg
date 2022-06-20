import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BottomSheetData } from '../../models/bottom-sheet-data.model';

@Component({
  selector: 'app-input-bottom-sheet',
  templateUrl: './input-bottom-sheet.component.html',
  styleUrls: ['./input-bottom-sheet.component.scss']
})
export class InputBottomSheetComponent {

  inputForm = new FormControl('', [Validators.required]);

  get data() {
    return this.dataConfig;
  }

  constructor(
    private bottomSheetRef: MatBottomSheetRef<InputBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private dataConfig: BottomSheetData,
  ) { }

  confirm() {
    this.bottomSheetRef.dismiss(this.inputForm.value);
  }

}
