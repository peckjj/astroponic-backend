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
import { HomeCardComponent } from './home/home-card/home-card.component';
import { ProjectsMenuComponent } from './projects/projects-menu/projects-menu.component';
import { AsciiTableComponent } from './projects/ascii-table/ascii-table.component';
import { ArtMainComponent } from './art/art-main/art-main.component';
import { ArtMenuComponent } from './art/art-menu/art-menu.component';
import { HieroglyphicsComponent } from './art/hieroglyphics/hieroglyphics.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GitMainComponent,
    HomeMainComponent,
    AboutMainComponent,
    ProjectsMainComponent,
    ContactsMainComponent,
    HomeCardComponent,
    ProjectsMenuComponent,
    AsciiTableComponent,
    ArtMainComponent,
    ArtMenuComponent,
    HieroglyphicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
