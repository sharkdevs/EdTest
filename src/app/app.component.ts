import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from './services/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EdTest';

  constructor(public auth: FirebaseAuthService) { }

  ngOnInit() { }

  login(){
    this.auth.firebaseGoogleAuth();
  }
}
