import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { InputBottomSheetComponent } from 'src/app/shared/components/input-bottom-sheet/input-bottom-sheet.component';
import { QuestionDialogComponent } from 'src/app/shared/components/question-dialog/question-dialog.component';
import { BottomSheetData } from 'src/app/shared/models/bottom-sheet-data.model';
import { QuestionDialogData } from 'src/app/shared/models/question-dialog-data.model';
import { Sheet } from 'src/app/shared/models/sheet.model';
import { IconsService } from 'src/app/shared/services/icons.service';
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
  hasTables: boolean = false;
  get icons() {
    return this.iconsService.icons;
  }

  get userEmail() {
    return this.userService.user?.email;
  }

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialogService: MatDialog,
    private tableService: TableService,
    private userService: UserService,
    private router: Router,
    private iconsService: IconsService,
  ) { }

  ngOnInit(): void {
    this.getTables();
  }

  getTables() {
    this.$tables = this.tableService
      .getTables()
      .pipe(tap(value => this.hasTables = value.length > 0));
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
      .subscribe(bottomSheetOut => {
        if (!!bottomSheetOut && !!bottomSheetOut.input) {
          this.createTable(bottomSheetOut.input);
        }
      })
  }

  async createTable(tableName: string) {
    const table = {
      name: tableName,
      dmEmail: this.userService.user?.email,
      playerSheets: [],
      masterSheets: [],
      notes: '',
    } as Table;
    await this.tableService.createTable(table);
    this.getTables();
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
      .subscribe(async confirm => {
        if (confirm) {
          await this.tableService.deleteTable(tablesId);
          this.getTables();
        }
      });
  }

  openTableDetails(id: string | undefined) {
    this.router.navigate(['home/table', id]);
  }

  showAdditionalPlayers(playerSheets: Sheet[]) {
    return !!playerSheets && playerSheets.length > 5;
  }

}
