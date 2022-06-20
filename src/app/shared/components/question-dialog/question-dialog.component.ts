import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { QuestionDialogData } from '../../models/question-dialog-data.model';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent {

  get data() {
    return this.dataConfig;
  }

  get button1Label() {
    return !!this.dataConfig.button1Label ? this.dataConfig.button1Label : 'Yes';
  }

  get button2Label() {
    return !!this.dataConfig.button2Label ? this.dataConfig.button2Label : 'No';
  }

  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dataConfig: QuestionDialogData,
  ) { }

  confirm() {
    this.dialogRef.close(true);
  }

  notConfirm() {
    this.dialogRef.close(false);
  }
}
