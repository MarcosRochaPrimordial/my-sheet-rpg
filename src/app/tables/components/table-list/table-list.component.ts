import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { InputBottomSheetComponent } from 'src/app/shared/components/input-bottom-sheet/input-bottom-sheet.component';
import { QuestionDialogComponent } from 'src/app/shared/components/question-dialog/question-dialog.component';
import { BottomSheetData } from 'src/app/shared/models/bottom-sheet-data.model';
import { QuestionDialogData } from 'src/app/shared/models/question-dialog-data.model';
import { TableService } from 'src/app/shared/services/table.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Table } from './../../../shared/models/table.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {

  $tables!: Observable<Table[]>;
  hasTables: boolean = true;
  icons: string[] = [
    './../../../../assets/icons/player.svg',
    './../../../../assets/icons/armour.svg',
    './../../../../assets/icons/dragon-knight.svg',
    './../../../../assets/icons/sourcerer.svg',
    './../../../../assets/icons/wizard.svg'
  ]

  get userEmail() {
    return this.userService.user?.email;
  }

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialogService: MatDialog,
    private tableService: TableService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.$tables = this.tableService
      .getTables()
      .pipe(tap(value => this.hasTables = !!value.length));
  }

  addTable() {
    const config: MatBottomSheetConfig = {
      data: {
        title: 'Create a table?',
        inputLabel: 'Table name',
      } as BottomSheetData,
    }
    const bottomSheetRef = this.bottomSheet.open(InputBottomSheetComponent, config);
    bottomSheetRef
      .afterDismissed()
      .subscribe(tableName => {
        if (!!tableName) {
          this.createTable(tableName)
        }
      })
  }

  async createTable(tableName: string) {
    const table = {
      name: tableName,
      dmEmail: this.userService.user?.email,
      playerSheets: [],
      masterSheets: [],
    } as Table;
    await this.tableService.createTable(table);
  }

  deleteTable(tablesId: string | undefined) {
    const config = {
      data: {
        title: 'Are you sure?',
        subtitle: `If you confirm, you're not gonna be able ta take it back.`,
        button1Label: 'Confirm',
        button2Label: 'Cancel',
      } as QuestionDialogData,
    };
    
    const dialogRef = this.dialogService.open(QuestionDialogComponent, config);
    dialogRef
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.tableService.deleteTable(tablesId);
        }
      })
  }

}
