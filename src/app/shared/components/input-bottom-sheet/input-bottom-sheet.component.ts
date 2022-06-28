import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BottomSheetData } from '../../models/bottom-sheet-data.model';

@Component({
  selector: 'app-input-bottom-sheet',
  templateUrl: './input-bottom-sheet.component.html',
  styleUrls: ['./input-bottom-sheet.component.scss']
})
export class InputBottomSheetComponent implements OnInit {

  inputForm = new FormControl('', [Validators.required]);
  auxInputForm = new FormControl(0);

  get data() {
    return this.dataConfig;
  }

  constructor(
    private bottomSheetRef: MatBottomSheetRef<InputBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private dataConfig: BottomSheetData,
  ) { }

  ngOnInit(): void {
    if (!!this.dataConfig.auxInputLabel) {
      this.auxInputForm.addValidators([Validators.required]);
    }
  }

  confirm() {
    this.bottomSheetRef.dismiss({
      input: this.inputForm.value,
      auxInput: this.auxInputForm.value,
    });
  }

}
