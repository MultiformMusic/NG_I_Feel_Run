import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeConnectedComponent } from './components/connected/home-connected/home-connected.component';
import { HomeComponent } from './components/home/home.component';
import { IntroComponent } from './components/intro/intro.component';

const routes: Routes = [
  {path: 'intro', component: IntroComponent},
  {path: 'home', component: HomeComponent},
  {path: 'connected/home', component: HomeConnectedComponent},
  {path: '**', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
