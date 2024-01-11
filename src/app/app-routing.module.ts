import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OnlineLibraryAdminComponent} from './OnlineLibraryAdminUse/onlineLibraryAdmin.component';
import {RegistrationComponent} from './UserRegistration/registration.component';
import {LoginAdminComponent} from './Login/LoginAdmin/loginAdmin.component';
import {HomepageComponent} from './HomePage/homepage.component';
import {PersonalLibraryAdminComponent} from './AdminPersonalLibrary/personalLibraryAdmin.component';
import {LoginClientComponent} from './Login/LoginClient/loginClient.component';
import {OnlineLibraryClientComponent} from './OnlineLibraryClientUse/onlineLibraryClient.component';
import {PersonalLibraryClientComponent} from './ClientPersonalLibrary/personalLibraryClient.component';

const routes: Routes = [
  { path: 'online-library-admin', component: OnlineLibraryAdminComponent },
  { path: 'online-library-client', component: OnlineLibraryClientComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'loginAdmin', component: LoginAdminComponent },
  { path: 'loginClient', component: LoginClientComponent },
  { path: 'personal-library-admin', component: PersonalLibraryAdminComponent },
  { path: 'personal-library-client', component: PersonalLibraryClientComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
