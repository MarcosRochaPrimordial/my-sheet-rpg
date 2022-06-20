import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { addDoc, collection, doc, Firestore } from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';
import { tap } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private loadingService: LoadingService,
    private firestore: Firestore,
    private angularFirestore: AngularFirestore,
  ) { }

  async create(collectionName: string, value: any) {
    this.loadingService.present();
    const collectionRef = collection(this.firestore, collectionName);
    await addDoc(collectionRef, value);
    this.loadingService.dismiss();
  }
  
  getCollection(collectionName: string, whereClause: QueryFn) {
    this.loadingService.present();
    return this.angularFirestore
      .collection(collectionName, whereClause)
      .valueChanges()
      .pipe(tap(_ => this.loadingService.dismiss()));
  }

  getDocument(collectionName: string) {
    this.loadingService.present();
    return this.angularFirestore
      .collection(collectionName)
      .valueChanges({ idField: 'id' })
      .pipe(tap(_ => this.loadingService.dismiss()));
  }

  async delete(collectionName: string, id: string | undefined) {
    this.loadingService.present();
    const collectionRef = doc(this.firestore, `${collectionName}/${id}`);
    await deleteDoc(collectionRef);
    this.loadingService.dismiss();
  }
}
