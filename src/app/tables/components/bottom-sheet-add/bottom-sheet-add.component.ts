import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-add',
  templateUrl: './bottom-sheet-add.component.html',
  styleUrls: ['./bottom-sheet-add.component.scss']
})
export class BottomSheetAddComponent implements OnInit {

  addForm!: FormGroup;

  get points() {
    return this.addForm.get('points') as FormControl;
  }

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetAddComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      playerEmail: [''],
      charName: ['', [Validators.required]],
      points: [0, [Validators.required]],
    });
  }

  addSheet() {
    this.bottomSheetRef.dismiss(this.addForm.getRawValue());
  }

}
