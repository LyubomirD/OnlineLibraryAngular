import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OnlineLibraryComponent} from './OnlineLibraryMainPage/onlinelibrary.component';
import {RegistrationComponent} from './UserRegistration/registration.component';

const routes: Routes = [
  { path: 'online-library', redirectTo: '/homepage' },
  { path: 'homepage', component: OnlineLibraryComponent },
  { path: 'registration', redirectTo: '/registration' },
  { path: 'registration', component: RegistrationComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
