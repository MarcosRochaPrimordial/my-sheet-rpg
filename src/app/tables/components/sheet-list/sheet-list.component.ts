import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { QuestionDialogComponent } from 'src/app/shared/components/question-dialog/question-dialog.component';
import { QuestionDialogData } from 'src/app/shared/models/question-dialog-data.model';
import { Sheet } from 'src/app/shared/models/sheet.model';
import { TableSheet } from 'src/app/shared/models/table-sheet.model';
import { Table } from 'src/app/shared/models/table.model';
import { IconsService } from 'src/app/shared/services/icons.service';
import { TableSheetService } from 'src/app/shared/services/table-sheet.service';
import { TableService } from 'src/app/shared/services/table.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BottomSheetAddComponent } from '../bottom-sheet-add/bottom-sheet-add.component';

@Component({
  selector: 'app-sheet-list',
  templateUrl: './sheet-list.component.html',
  styleUrls: ['./sheet-list.component.scss']
})
export class SheetListComponent implements OnInit, OnDestroy {

  private $subscriber = new Subject<boolean>();
  table!: Table;
  playerSheets: Sheet[] = [];
  masterSheets: Sheet[] = [];

  get userEmail() {
    return this.userService.user?.email;
  }

  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private tableService: TableService,
    private tableSheetService: TableSheetService,
    private iconsService: IconsService,
    private dialogService: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe(params => {
        this.tableService
          .getTableById(params.get('id')!)
          .pipe(
            map(value => value[0]),
            takeUntil(this.$subscriber),
          )
          .subscribe(table => {
            this.table = table;
          });
      });
  }

  ngOnDestroy(): void {
    this.$subscriber.next(true);
  }

  addSheet() {
    const bottomSheetRef = this.bottomSheet.open(BottomSheetAddComponent);
    bottomSheetRef
      .afterDismissed()
      .subscribe(newSheet => {
        if (!!newSheet) {
          const table = this.setupTable(newSheet.playerEmail, newSheet.charName, newSheet.points);
          const tableSheet = this.setupTableSheet(newSheet.playerEmail, table.id);
          this.tableService.updateTable(table);
          if (!!newSheet.playerEmail) {
            this.tableSheetService.createTable(tableSheet);
          }
        }
      });
  }

  setupTable(playerEmail: string, charName: string, points: number): Table {
    const playerSheets = this.table.playerSheets;
    const masterSheets = this.table.masterSheets;
    const sheet = this.blankSheet(playerEmail, charName, points);
    if (!!playerEmail) {
      playerSheets.push(sheet);
    } else {
      masterSheets.push(sheet);
    }
    return {
      ...this.table,
      playerSheets,
      masterSheets,
    } as Table;
  }

  private setupTableSheet(playerEmail: string, tableId: string | undefined) {
    return {
      sheetEmail: playerEmail,
      table: tableId,
    } as TableSheet;
  }

  private blankSheet(playerEmail: string, charName: string, points: number) {
    return {
      charIcon: this.iconsService.randomizeIcon(),
      playerEmail,
      charName,
      points,
      xp: 0,
      health: 0,
      magic: 0,
      story: '',
      characteristics: {
        strength: 0,
        hability: 0,
        endurance: 0,
        harness: 0,
        firePower: 0,
      },
      advantages: [],
      disadvantages: [],
      knownMagics: [],
      items: [],
    } as Sheet;
  }

  updatePlayerSheetTable(sheet: Sheet, sheetIndex: number) {
    this.table.playerSheets[sheetIndex] = sheet;
    this.tableService.updateTable(this.table);
  }

  updateMasterSheetTable(sheet: Sheet, sheetIndex: number) {
    this.table.masterSheets[sheetIndex] = sheet;
    this.tableService.updateTable(this.table);
  }

  deletePlayerSheetTable(sheetIndex: number) {
    const data = {
      title: 'Are you sure...?',
      subtitle: `There's no turning back.`,
      button1Label: 'Yes',
      button2Label: 'Cancel',
    } as QuestionDialogData;

    this.dialogService.open(QuestionDialogComponent, {
      data,
    })
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.table.playerSheets = this.table.playerSheets.filter((value, index) => index !== sheetIndex);
          this.tableService.updateTable(this.table);
          this.tableSheetService.deleteByTableId(this.table.id);
        }
      });
  }

  deleteMasterSheetTable(sheetIndex: number) {
    const data = {
      title: 'Are you sure...?',
      subtitle: `There's no turning back.`,
      button1Label: 'Yes',
      button2Label: 'Cancel',
    } as QuestionDialogData;

    this.dialogService.open(QuestionDialogComponent, {
      data,
    })
      .afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.table.masterSheets = this.table.masterSheets.filter((value, index) => index !== sheetIndex);
          this.tableService.updateTable(this.table);
        }
      });
  }

  verifyIfHavePermission() {
    return !!this.table && this.userEmail === this.table.dmEmail;
  }
}
