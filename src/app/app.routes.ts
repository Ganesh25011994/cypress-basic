import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MpinComponent } from './components/mpin/mpin.component';
import { PersonalComponent } from './components/personal/personal.component'

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'mpin',
        component: MpinComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'personal',
        component: PersonalComponent,
      }
];
  