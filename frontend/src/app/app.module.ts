import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GitMainComponent } from './git/git-main/git-main.component';
import { HomeMainComponent } from './home/home-main/home-main.component';
import { AboutMainComponent } from './about/about-main/about-main.component';
import { ProjectsMainComponent } from './projects/projects-main/projects-main.component';
import { ContactsMainComponent } from './contacts/contacts-main/contacts-main.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GitMainComponent,
    HomeMainComponent,
    AboutMainComponent,
    ProjectsMainComponent,
    ContactsMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
