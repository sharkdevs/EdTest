import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MediumComponent } from './medium/medium.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AuthComponent } from './auth/auth.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['content']);
const routes: Routes = [
  { path: '',   redirectTo:'login', pathMatch: 'full' },
  { path: 'login',      component: AuthComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems } },
  { path: 'content', component: MediumComponent, canActivate: [AngularFireAuthGuard],   data: { authGuardPipe: redirectUnauthorizedToLogin }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
