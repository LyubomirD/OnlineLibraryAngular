import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OnlineLibraryComponent} from './OnlineLibraryMainPage/onlinelibrary.component';

const routes: Routes = [
  { path: 'online-library', redirectTo: '/homepage' },
  { path: 'homepage', component: OnlineLibraryComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
