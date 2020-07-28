import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';

export class Document {
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseStoreService {
  user: any;
  documentRef: any;
  constructor(
    public fireStore: AngularFirestore
  ) {
    this.documentRef = this.fireStore.collection('documents');
  }

  saveRecord(uid, document) {
      this.documentRef.doc(uid).set({
        body: document
      });
  }

  getRecord(uid) {
    return this.fireStore.collection('documents').doc(uid).get();

  }
}
