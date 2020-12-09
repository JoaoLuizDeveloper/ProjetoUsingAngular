import { Injectable, Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { DoctorService } from '../Services/doctor.service';
import { IDoctor } from '../Models/doctor.interface';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-doctorCrUp-component',
  templateUrl: './doctorCrUp.component.html',
  providers: [DoctorService]
})
export class DoctorCrUpComponent implements OnInit {

  // Doctor
   doctor: IDoctor;
   doctors: IDoctor[];

  constructor(private doctorService: DoctorService) {  }
    
  ngOnInit() {
    this.getDoctor();
  }

  // Call the service to get all the doctors
  getDoctor() {
    this.doctorService.getDoctorById(this.doctor.id).subscribe((doctor: IDoctor) => {
      this.doctor = doctor;
    });
  }

  // define if a Doctor is will be created or updated
  saveDoctor(form: NgForm) {
    if (this.doctor.id !== undefined) {
      this.doctorService.updateDoctor(this.doctor).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.doctorService.saveDoctor(this.doctor).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // copy the Doctor to be updated
  editDoctor(doctor: IDoctor) {
    this.doctor = { ...doctor };
  }

  // Clean the form
  cleanForm(form: NgForm) {
    this.getDoctor();
    form.resetForm();
    this.doctor = {} as IDoctor;
  }
}
