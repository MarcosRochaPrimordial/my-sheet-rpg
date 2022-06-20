import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TableListComponent } from './components/table-list/table-list.component';
import { TablesRoutingModule } from './tables-routing.module';

@NgModule({
  declarations: [
    TableListComponent
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    SharedModule,
  ]
})
export class TablesModule { }
