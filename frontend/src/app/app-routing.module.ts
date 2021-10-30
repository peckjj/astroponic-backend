import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMainComponent } from './about/about-main/about-main.component';
import { AppComponent } from './app.component';
import { ArtMainComponent } from './art/art-main/art-main.component';
import { ConnectFourComponent } from './art/connect-four/connect-four.component';
import { HieroglyphicsComponent } from './art/hieroglyphics/hieroglyphics.component';
import { ContactsMainComponent } from './contacts/contacts-main/contacts-main.component';
import { GitMainComponent } from './git/git-main/git-main.component';
import { HomeMainComponent } from './home/home-main/home-main.component';
import { AsciiTableComponent } from './projects/ascii-table/ascii-table.component';
import { ProjectsMainComponent } from './projects/projects-main/projects-main.component';

const routes: Routes = [
  {path: 'git', component: GitMainComponent},
  {path: 'home', component: HomeMainComponent},
  {path: 'about', component: AboutMainComponent},
  {path: 'projects', component: ProjectsMainComponent},
  {path: 'contact', component: ContactsMainComponent},
  {path: 'projects', component: ProjectsMainComponent, children: [
    {path: 'ascii-table', component: AsciiTableComponent}
  ]},
  {path: 'art', component: ArtMainComponent, children: [
    {path: 'hieroglyphics', component: HieroglyphicsComponent},
    {path: 'connect-four', component: ConnectFourComponent}
  ]},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
