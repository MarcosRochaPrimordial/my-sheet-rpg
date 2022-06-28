import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TableListComponent } from './components/table-list/table-list.component';
import { TablesRoutingModule } from './tables-routing.module';
import { SheetListComponent } from './components/sheet-list/sheet-list.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { CharacteristicsComponent } from './components/characteristics/characteristics.component';
import { GenericListComponent } from './components/generic-list/generic-list.component';
import { BottomSheetAddComponent } from './components/bottom-sheet-add/bottom-sheet-add.component';

@NgModule({
  declarations: [
    TableListComponent,
    SheetListComponent,
    SheetComponent,
    CharacteristicsComponent,
    GenericListComponent,
    BottomSheetAddComponent,
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    SharedModule,
  ]
})
export class TablesModule { }
