import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';

import { User } from '../models/user.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private APP_KEY_USER = 'my-sheet-rpg:local:user';
  private COLLECTION_NAME = 'users';

  get user(): User | null {
    const user = localStorage.getItem(this.APP_KEY_USER);
    if (!!user) {
      return JSON.parse(user);
    }
    return null;
  }

  constructor(
    private firestoreService: FirestoreService,
  ) { }

  signUp(user: User) {
    return this.firestoreService
      .getCollection(this.COLLECTION_NAME, ref => ref.where('email', '==', user.email))
      .pipe(
        tap(async (userCollection) => {
          if (!userCollection.length) {
            await this.firestoreService.create(this.COLLECTION_NAME, user);
          }
          localStorage.setItem(this.APP_KEY_USER, JSON.stringify(user));
        }),
        take(1),
      );
  }

  signOut() {
    localStorage.removeItem(this.APP_KEY_USER);
  }
}
