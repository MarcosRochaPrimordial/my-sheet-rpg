import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InputBottomSheetComponent } from 'src/app/shared/components/input-bottom-sheet/input-bottom-sheet.component';
import { BottomSheetData } from 'src/app/shared/models/bottom-sheet-data.model';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent {

  @Input() listTitle: string = '';
  @Input() auxInputLabel: string = '';
  @Input() formList!: FormArray;

  get controls() {
    return this.formList.controls;
  }

  constructor(
    private bottomSheet: MatBottomSheet,
    private fb: FormBuilder,
  ) { }

  raiseInput() {
    const config = {
      data: {
        title: `Add a ${this.listTitle}`,
        inputLabel: this.listTitle,
        inputDisposition: 55,
        auxInputLabel: this.auxInputLabel,
        auxInputDisposition: 40,
      } as BottomSheetData,
    };

    const bottomSheetRef = this.bottomSheet.open(InputBottomSheetComponent, config);
    bottomSheetRef
      .afterDismissed()
      .subscribe(bottomSheetOut => {
        if (!!bottomSheetOut) {
          this.formList.push(this.fb.group({
            input: bottomSheetOut.input,
            auxInput: bottomSheetOut.auxInput,
          }));
        }
      });
  }

  removeChip(index: number) {
    this.formList.removeAt(index);
  }

}
