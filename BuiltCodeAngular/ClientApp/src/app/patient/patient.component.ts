import { Injectable, Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { PatientService } from "../Services/patient.service";
import { IPatient } from '../Models/patient.interface';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-patient-component',
  templateUrl: './patient.component.html',
  providers: [PatientService]
})
export class PatientComponent implements OnInit  {
  // Patient
   patient: IPatient = <IPatient>{};
   patients: IPatient[];

  constructor(private patientService: PatientService) {

  }

  ngOnInit() {
    this.getPatients();
  }

  //Call the service to get all the patients
  getPatients() {
    this.patientService.getPatients().subscribe((patients: IPatient[]) => {
      this.patients = patients;
    });
  }

  // define if a Patient is will be created or updated
  saveCar(form: NgForm) {
    if (this.patient.id !== undefined) {
      this.patientService.updatePatient(this.patient).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.patientService.savePatient(this.patient).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // delete the Patient
  deleteCar(patient: IPatient) {
    this.patientService.deletePatient(patient).subscribe(() => {
      this.getPatients();
    });
  }
  // copy the Patient to be updated
  editDoctor(patient: IPatient) {
    this.patient = { ...patient };
  }

  // Clean the form
  cleanForm(form: NgForm) {
    this.getPatients();
    form.resetForm();
    this.patient = {} as IPatient;
  }
}
