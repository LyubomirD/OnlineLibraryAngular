import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OnlineLibraryComponent} from './OnlineLibraryMainPage/onlinelibrary.component';
import {RegistrationComponent} from './UserRegistration/registration.component';
import {LoginComponent} from './LoginUser/login.component';
import {HomepageComponent} from './HomePage/homepage.component';

const routes: Routes = [
  { path: 'online-library', redirectTo: '/online-library' },
  { path: 'online-library', component: OnlineLibraryComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
