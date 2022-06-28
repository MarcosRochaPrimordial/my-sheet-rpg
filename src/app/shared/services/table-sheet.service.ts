import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TableSheet } from '../models/table-sheet.model';
import { FirestoreService } from './firestore.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TableSheetService {

  private COLLECTION_NAME = 'tableSheet';

  constructor(
    private firestoreService: FirestoreService,
    private userService: UserService,
  ) { }

  getTableSheet(): Observable<TableSheet[]> {
    return this.firestoreService
      .getCollection(this.COLLECTION_NAME,
        ref => ref.where('sheetEmail', '==', this.userService.user?.email)) as Observable<TableSheet[]>;
  }

  getTableSheetByTableId(id: string | undefined): Observable<TableSheet> {
    return this.firestoreService
      .getCollection(this.COLLECTION_NAME,
        ref => ref.where('table', '==', id))
      .pipe(map(value => value[0])) as Observable<TableSheet>;
  }

  async createTable(table: TableSheet) {
    await this.firestoreService.create(this.COLLECTION_NAME, table);
  }

  deleteByTableId(id: string | undefined) {
    this.getTableSheetByTableId(id)
      .subscribe(tableSheet => {
        this.firestoreService.delete(this.COLLECTION_NAME, tableSheet.id);
      });
  }
}
