import { Injectable, Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { PatientService } from "../Services/patient.service";
import { DoctorService } from "../Services/doctor.service";
import { IPatient } from '../Models/patient.interface';
import { IDoctor } from '../Models/doctor.interface';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ReactiveFormsModule } from "@angular/forms";
import { error } from 'console';

@Component({
  selector: 'app-patient-component',
  templateUrl: './patient.component.html',
  providers: [PatientService, DoctorService],
})
export class PatientComponent implements OnInit  {
  // Patient
   patient: IPatient = <IPatient>{};
  patients: IPatient[];
  patientsCPFs: IPatient[];
  patientsclean: IPatient[];

  // Doctor
  doctor: IDoctor = <IDoctor>{};
  doctors: IDoctor[];

  //Forms Variables
  formLabel: string;
  isEditMode: boolean = false;
  form: FormGroup;

  constructor(private patientService: PatientService, private doctorService: DoctorService, private fb: FormBuilder) {
    this.form = fb.group({
      "name": ["", Validators.required],
      "cpf": ["", Validators.required],
      "birthDate": ["", Validators.required],
      "doctorId": ["", Validators.required],
    });
    this.formLabel = "Create Patient";
  }

  ngOnInit() {
    this.getPatients();
    this.getDoctors();   
  }

  //Call the service to get all the patients
  private getPatients() {
    this.patientService.getPatients().subscribe(
      data => this.patients = data,
      error => alert(error),
      () => console.log(this.patients)
    )
  }

  private getDoctors() {
    this.doctorService.getDoctors().subscribe(
      data => this.doctors = data,
      error => alert(error),
      () => console.log(this.doctors)
    );
  }

  //getCpfMask(event: KeyboardEvent): string {
  //  return this.mask = '00.000.0000-00';
  //}

  verificarCpf($event: KeyboardEvent) {
    let cpf = (<HTMLInputElement>event.target).value;
  

  var strCPF = cpf.replace(".", "");
  strCPF = strCPF.replace(".", "");
  strCPF = strCPF.replace("-", "");
  
     
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") {
      alert("Please set a valid CPF");
      this.form.get("cpf")!.setValue('');
      return false;
    }

    for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) {
      alert("Please set a valid CPF");
      this.form.get("cpf")!.setValue('');
      return false;
    }

    Soma = 0;
    for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) {
      alert("Please set a valid CPF");
      this.form.get("cpf")!.setValue('');
      return false;
    }

    var patient = this.patientService.getsearchCpf(parseInt(strCPF)).subscribe(
      response => this.patientsCPFs = response
    )

    if (this.patientsCPFs.length > 0) {
      alert("This number of CPF already exist");
      this.form.get("cpf")!.setValue('');
      this.patientsCPFs = this.patientsclean;
      return false;
    }
    
    return true;
}

  onSubmit() {
    this.patient.name = this.form.controls["name"].value;
    this.patient.cpf = this.form.controls["cpf"].value;
    this.patient.birthDate = this.form.controls["birthDate"].value;
    this.patient.doctorId = this.form.controls["doctorId"].value;    

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
    this.form.get("doctorId")!.setValue(patientForm.doctorId);
  };


  cancel() {
    this.formLabel = "Create Doctor";
    this.isEditMode = false;
    this.patient = <IPatient>{};
    //limpar os campos do formulário
    this.form.get("name")!.setValue('');
    this.form.get("cpf")!.setValue('');
    this.form.get("birthDate")!.setValue('');
    this.form.get("doctorId")!.setValue('');
  };

  //Delete the Doctor
  delete(patient: IPatient) {
    if (confirm("You really want to delete this Patient? You can't be able to recover it")) {
      this.patientService.deletePatient(patient.id)
        .subscribe(response => {
          this.getPatients();
          this.form.reset();
        });
    }
  };  
}
