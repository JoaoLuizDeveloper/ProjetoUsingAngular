import { Injectable, Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { PatientService } from "../Services/patient.service";
import { IPatient } from '../Models/patient.interface';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-patient-component',
  templateUrl: './patient.component.html',
  providers: [PatientService]
})
export class PatientComponent implements OnInit  {
  // Patient
   patient: IPatient = <IPatient>{};
   patients: IPatient[];

  //Forms Variables
  formLabel: string;
  isEditMode: boolean = false;
  form: FormGroup;

  constructor(private patientService: PatientService, private fb: FormBuilder) {
    this.form = fb.group({
      "name": ["", Validators.required],
      "crm": ["", Validators.required],
      "crmuf": ["", Validators.required],
    });
    this.formLabel = "Create Patient";
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

  onSubmit() {
    this.patient.name = this.form.controls["name"].value;
    this.patient.cpf = this.form.controls["cpf"].value;
    this.patient.birthDate = this.form.controls["birthDate"].value;    

    //Create and Update
    if (this.isEditMode) {
      this.patientService.updatePatient(this.patient)
        .subscribe(response => {
          this.getPatients();
          this.form.reset();
        });
    } else {
      this.patientService.savePatient(this.patient)
        .subscribe(response => {
          this.getPatients();
          this.form.reset();
        });
    }
  };

  //Update the Doctor
  edit(patientForm: IPatient) {
    this.formLabel = "Update Doctor";
    this.isEditMode = true;
    this.patient = patientForm;
    //preencher campos do formulário
    this.form.get("name")!.setValue(patientForm.name);
    this.form.get("cpf")!.setValue(patientForm.cpf);
    this.form.get("birthDate")!.setValue(patientForm.birthDate);
  };


  cancel() {
    this.formLabel = "Create Doctor";
    this.isEditMode = false;
    this.patient = <IPatient>{};
    //limpar os campos do formulário
    this.form.get("name")!.setValue('');
    this.form.get("cpf")!.setValue('');
    this.form.get("birthDate")!.setValue('');
  };

  //Delete the Doctor
  delete(patient: IPatient) {
    if (confirm("You really want to delete this Doctor? You can't be able to recover it")) {
      this.patientService.deletePatient(patient.id)
        .subscribe(response => {
          this.getPatients();
          this.form.reset();
        });
    }
  };  
}
