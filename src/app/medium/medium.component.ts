import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medium',
  templateUrl: './medium.component.html',
  styleUrls: ['./medium.component.scss']
})
export class MediumComponent implements OnInit {

  constructor(
    public auth: FirebaseAuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  logout(){
    this.auth.firebaseGoogleLogout().then(
      (resp)=>{
        this.router.navigate(['/login'])
    });;
  }
}
