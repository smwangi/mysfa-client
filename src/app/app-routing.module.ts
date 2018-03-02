import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitModeComponent } from './components/visit-mode/visit-mode.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {AuthGuard } from './guards/auth.guard';
import {AdminAuthGuard } from './guards/admin-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'visit-mode',
    component:VisitModeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'**', //redirectTo:'/home', pathMatch: 'full'
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
