import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

import { Table } from '../models/table.model';
import { FirestoreService } from './firestore.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private COLLECTION_NAME = 'tables';

  constructor(
    private userService: UserService,
    private firestoreService: FirestoreService
  ) { }

  async createTable(table: Table) {
    await this.firestoreService.create(this.COLLECTION_NAME, table);
  }

  getTables(): Observable<Table[]> {
    return this.firestoreService
      .getDocument(this.COLLECTION_NAME)
      .pipe(
        map(value => value
          .filter(table =>
            (table as Table).dmEmail === this.userService.user?.email ||
            (table as Table).sheets.some(sheet => sheet.playerEmail === this.userService.user?.email))
        )
      ) as Observable<Table[]>;
  }

  async deleteTable(id: string | undefined) {
    await this.firestoreService.delete(this.COLLECTION_NAME, id);
  }
}
