import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { InputBottomSheetComponent } from './components/input-bottom-sheet/input-bottom-sheet.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { QuestionDialogComponent } from './components/question-dialog/question-dialog.component';
import { SliderDirective } from './directives/slider.directive';

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
  MatTabsModule,
  MatExpansionModule,
  MatMenuModule,
  MatChipsModule,
  MatRippleModule,
];
const COMPONENTS = [
  InputBottomSheetComponent,
  QuestionDialogComponent,
  SliderDirective,
  NumberInputComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: MODULES,
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule { }
