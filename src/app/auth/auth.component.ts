import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  title = 'EdTest';
  constructor(
    public auth: FirebaseAuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  login(){
    let response = this.auth.firebaseGoogleAuth().then(
      (resp)=>{
        this.router.navigate(['/content'])
    });


  }
}
