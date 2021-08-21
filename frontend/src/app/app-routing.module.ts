import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMainComponent } from './about/about-main/about-main.component';
import { AppComponent } from './app.component';
import { ContactsMainComponent } from './contacts/contacts-main/contacts-main.component';
import { GitMainComponent } from './git/git-main/git-main.component';
import { HomeMainComponent } from './home/home-main/home-main.component';
import { ProjectsMainComponent } from './projects/projects-main/projects-main.component';

const routes: Routes = [
  {path: 'git', component: GitMainComponent},
  {path: 'home', component: HomeMainComponent},
  {path: 'about', component: AboutMainComponent},
  {path: 'projects', component: ProjectsMainComponent},
  {path: 'contact', component: ContactsMainComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
