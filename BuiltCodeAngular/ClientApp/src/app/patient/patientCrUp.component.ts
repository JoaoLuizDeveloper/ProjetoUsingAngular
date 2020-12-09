import { Injectable, Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { PatientService } from "../Services/patient.service";
import { IPatient } from '../Models/patient.interface';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-patientCrUp-component',
  templateUrl: './patientCrUp.component.html',
  providers: [PatientService]
})
export class PatientCrUpComponent implements OnInit  {
  // Patient
   patient: IPatient = <IPatient>{};
   patients: IPatient[];

  constructor(private patientService: PatientService) {

  }

  ngOnInit() {
    this.getPatient();
  }

  //Call the service to get all the patients
  getPatient() {
    this.patientService.getPatients().subscribe((patients: IPatient[]) => {
      this.patients = patients;
    });
  }

  
  // copy the Patient to be updated
  editPatient(patient: IPatient) {
    this.patient = { ...patient };
  }

}
