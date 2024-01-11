import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {OnlineLibraryAdminComponent} from './OnlineLibraryAdminUse/onlineLibraryAdmin.component';
import {RegistrationComponent} from './UserRegistration/registration.component';
import { LoginAdminComponent } from './Login/LoginAdmin/loginAdmin.component';
import {HomepageComponent} from './HomePage/homepage.component';
import {PersonalLibraryAdminComponent} from './AdminPersonalLibrary/personalLibraryAdmin.component';
import {OnlineLibraryClientComponent} from './OnlineLibraryClientUse/onlineLibraryClient.component';
import {LoginClientComponent} from './Login/LoginClient/loginClient.component';
import {PersonalLibraryClientComponent} from './ClientPersonalLibrary/personalLibraryClient.component';

@NgModule({
  declarations: [
    AppComponent,
    OnlineLibraryAdminComponent,
    OnlineLibraryClientComponent,
    RegistrationComponent,
    LoginAdminComponent,
    LoginClientComponent,
    HomepageComponent,
    PersonalLibraryAdminComponent,
    PersonalLibraryClientComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
