import { Injectable, Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { DoctorService } from '../Services/doctor.service';
import { IDoctor } from '../Models/doctor.interface';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-doctor-component',
  templateUrl: './doctor.component.html',
  providers: [DoctorService]
})
export class DoctorComponent implements OnInit {

    // Doctor
  doctor: IDoctor = <IDoctor>{};
   doctors: IDoctor[];

    
    //Forms Variables
    formLabel: string;
    isEditMode: boolean = false;
    form: FormGroup;

  constructor(private doctorService: DoctorService, private fb: FormBuilder) {
    this.form = fb.group({
      "name": ["", Validators.required],
      "crm": ["", Validators.required],
      "crmuf": ["", Validators.required],
    });
    this.formLabel = "Create Doctor";
  }
     
  ngOnInit() {
    this.getDoctors();    
  }

  // Call the service to get all the doctors
  private getDoctors() {
    this.doctorService.getDoctors().subscribe(
      data => this.doctors = data,
      error => alert(error),
      () => console.log(this.doctors)
    );
  }

  firstCrm($event: KeyboardEvent) {
    var crm = (<HTMLInputElement>event.target).value;
    var uf = (<HTMLInputElement>document.getElementById("crmuf")).value;
    (<HTMLInputElement>document.getElementById("crmfim")).value = crm + '-' + uf;
  }

  secondCrm($event: KeyboardEvent) {
    var crm = (<HTMLInputElement>document.getElementById("crm")).value;
    var uf = (<HTMLInputElement>event.target).value;
    (<HTMLInputElement>document.getElementById("crmfim")).value = crm + '-' + uf;

  }

  onSubmit() {
    this.doctor.name = this.form.controls["name"].value;
    this.doctor.crm = this.form.controls["crm"].value;
    this.doctor.crmuf = this.form.controls["crmuf"].value;

    //Create and Update
    if (this.isEditMode) {
      this.doctorService.updateDoctor(this.doctor)
        .subscribe(response => {
          this.getDoctors();
          this.form.reset();
        });
    } else {
      this.doctorService.saveDoctor(this.doctor)
        .subscribe(response => {
          this.getDoctors();
          this.form.reset();
        });
    }
  };

  //Update the Doctor
  edit(doctorForm: IDoctor) {
    this.formLabel = "Update Doctor";
    this.isEditMode = true;
    this.doctor = doctorForm;
    //preencher campos do formulário
    this.form.get("name")!.setValue(doctorForm.name);
    this.form.get("crm")!.setValue(doctorForm.crm);
    this.form.get("crmuf")!.setValue(doctorForm.crmuf);
    (<HTMLInputElement>document.getElementById("crmfim")).value = doctorForm.crm + '-' + doctorForm.crmuf;
  };

  //scroll(el: HTMLElement) {
  //  el.scrollIntoView();
  //};

  cancel() {
    this.formLabel = "Create Doctor";
    this.isEditMode = false;
    this.doctor = <IDoctor>{};
    //limpar os campos do formulário
    this.form.get("name")!.setValue('');
    this.form.get("crm")!.setValue('');
    this.form.get("crmuf")!.setValue('');
    this.form.get("crmfim")!.setValue('');
    (<HTMLInputElement>document.getElementById("crmfim")).value = '';
  };

  //Delete the Doctor
  delete(doctor: IDoctor) {
    if (confirm("You really want to delete this Doctor? You can't be able to recover it")) {
      this.doctorService.deleteDoctor(doctor.id)
        .subscribe(response => {
          this.getDoctors();
          this.form.reset();
        });
    }
  };  
}
