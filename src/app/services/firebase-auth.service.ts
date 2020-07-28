import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    public fireAuth: AngularFireAuth,
  ) { }

  firebaseGoogleAuth(){
    return this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider())
    .then((result) => {
        console.log('You have been successfully logged in!', result)
    }).catch((error) => {
        console.log(error)
    })
  }
  firebaseGoogleLogout(){
    return this.fireAuth.signOut()
    .then((result) => {
        console.log('You have been successfully logged out!', result)
    }).catch((error) => {
        console.log(error)
    })
  }
}
