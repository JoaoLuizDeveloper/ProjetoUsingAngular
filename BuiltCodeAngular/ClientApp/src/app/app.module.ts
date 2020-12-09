import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, Pipe, Directive } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//import { DoctorCrUpComponent } from './doctor/doctorCrUp.component';
//import { PatientCrUpComponent } from './patient/patientCrUp.component';

import { map, catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DoctorComponent,
    PatientComponent,
    //DoctorCrUpComponent,
    //PatientCrUpComponent
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
      //{ path: 'doctorCrUp', component: DoctorCrUpComponent, pathMatch: 'full' },
      { path: 'patient', component: PatientComponent, pathMatch: 'full' },
      //{ path: 'patientCrUp', component: PatientCrUpComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
