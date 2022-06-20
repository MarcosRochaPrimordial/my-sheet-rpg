import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

import { InputBottomSheetComponent } from './components/input-bottom-sheet/input-bottom-sheet.component';
import { QuestionDialogComponent } from './components/question-dialog/question-dialog.component';

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatBottomSheetModule,
  MatProgressSpinnerModule,
  MatDialogModule,
];
const COMPONENTS = [InputBottomSheetComponent, QuestionDialogComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: MODULES,
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule { }
