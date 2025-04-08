import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MpinComponent } from './components/mpin/mpin.component';
import { PersonalComponent } from './components/personal/personal.component'
import { ChooseCustomerComponent } from './components/choose-customer/choose-customer.component';
import { NewCustomerComponent } from './components/new-customer/new-customer.component';
import { CoreTabsComponent } from './components/core-tabs/core-tabs.component';
import { CustomerNameComponent } from './components/customer-name/customer-name.component';
import { ExistingApplicationsComponent } from './components/existing-applications/existing-applications.component';
import { CreditReviewComponent } from './components/credit-review/credit-review.component';
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
      },
      {
        path: 'choose-customer',
        component: ChooseCustomerComponent,
      },
      {
        path: 'new-customer',
        component: NewCustomerComponent,
      },
      {
        path: 'core-tabs',
        component: CoreTabsComponent
      },
      {
        path: 'customer-name',
        component: CustomerNameComponent
      },
      {
        path: 'existing-applications',
        component: ExistingApplicationsComponent
      },
      {
        path: 'credit-review',
        component: CreditReviewComponent
      }
      
];
  