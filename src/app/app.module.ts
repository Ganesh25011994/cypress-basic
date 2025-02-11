import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MpinComponent } from './components/mpin/mpin.component';
import { PersonalComponent } from './components/personal/personal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MpinComponent,
    PersonalComponent,
    LoaderComponent,
    ReactiveFormsModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
