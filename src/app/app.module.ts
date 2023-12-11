import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {OnlineLibraryComponent} from './OnlineLibraryMainPage/onlinelibrary.component';
import {RegistrationComponent} from './UserRegistration/registration.component';
import { LoginComponent } from './LoginUser/login.component';
import {HomepageComponent} from './HomePage/homepage.component';
import {PersonalLibraryComponent} from './UserPersonalLibrary/personalLibrary.component';

@NgModule({
  declarations: [
    AppComponent,
    OnlineLibraryComponent,
    RegistrationComponent,
    LoginComponent,
    HomepageComponent,
    PersonalLibraryComponent,
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
