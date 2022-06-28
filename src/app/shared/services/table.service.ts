import { Injectable } from '@angular/core';
import { documentId } from '@angular/fire/firestore';
import { map, merge, Observable, take } from 'rxjs';

import { Table } from '../models/table.model';
import { FirestoreService } from './firestore.service';
import { TableSheetService } from './table-sheet.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private COLLECTION_NAME = 'tables';

  constructor(
    private userService: UserService,
    private firestoreService: FirestoreService,
    private tableSheetService: TableSheetService,
  ) { }

  async createTable(table: Table) {
    await this.firestoreService.create(this.COLLECTION_NAME, table);
  }

  getTables(): Observable<Table[]> {
    return new Observable(subscriber => {
      this.tableSheetService
        .getTableSheet()
        .pipe(
          map(value => value.map(tableSheet => tableSheet.table)),
          take(1)
        )
        .subscribe(tablesIds => {
          merge(...this.getQueries(tablesIds))
            .pipe(take(1))
            .subscribe(tables => subscriber.next(tables as Table[]));
        });
    });
  }

  async deleteTable(id: string | undefined) {
    await this.firestoreService.delete(this.COLLECTION_NAME, id);
  }

  getTableById(id: string): Observable<Table[]> {
    return this.firestoreService
      .getCollection(this.COLLECTION_NAME,
        ref => ref.where(documentId(), '==', id)) as Observable<Table[]>;
  }

  async updateTable(table: Table) {
    await this.firestoreService.update(this.COLLECTION_NAME, table);
  }

  private getQueries(tablesIds: string[]) {
    const queryConstraints = [];
    if (tablesIds.length > 0) {
      queryConstraints.push(this.firestoreService
        .getCollection(this.COLLECTION_NAME,
          ref => ref.where(documentId(), 'in', tablesIds))
        .pipe(take(1)));
    }

    queryConstraints.push(this.firestoreService
      .getCollection(this.COLLECTION_NAME,
        ref => ref.where('dmEmail', '==', this.userService.user?.email))
      .pipe(take(1)));

    return queryConstraints;
  }
}
