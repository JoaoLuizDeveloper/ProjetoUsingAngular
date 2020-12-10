/// <reference path="patient/createupdate/patientcrup.component.ts" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, Pipe, Directive } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { DoctorComponent } from './doctor/List/doctor.component';
import { DoctorCrUpComponent } from './doctor/CreateUpdate/doctorCrUp.component';

import { PatientComponent } from './patient/List/patient.component';
import { PatientCrUpComponent } from './patient/CreateUpdate/patientCrUp.component';
import { PatientMedicoComponent } from './patient/Relatorio/patientMedico.component';

import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DoctorComponent,
    PatientComponent,
    PatientMedicoComponent,
    DoctorCrUpComponent,
    PatientCrUpComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    CommonModule,
    AngularFontAwesomeModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'doctor', component: DoctorComponent, pathMatch: 'full' },
      { path: 'doctorCrUp', component: DoctorCrUpComponent, pathMatch: 'full' },
      { path: 'doctorCrUp/:id', component: DoctorCrUpComponent, pathMatch: 'full' },
      { path: 'patient', component: PatientComponent, pathMatch: 'full' },
      { path: 'patientCrUp', component: PatientCrUpComponent, pathMatch: 'full' },
      { path: 'patientMedico', component: PatientMedicoComponent, pathMatch: 'full' },
      { path: 'patientCrUp/:id', component: PatientCrUpComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
