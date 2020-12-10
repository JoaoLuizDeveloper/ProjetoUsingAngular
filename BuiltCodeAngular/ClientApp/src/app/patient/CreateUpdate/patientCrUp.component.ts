import { Component, OnInit } from '@angular/core';
import { PatientService } from "../../Services/patient.service";
import { DoctorService } from "../../Services/doctor.service";
import { IPatient } from '../../Models/patient.interface';
import { IDoctor } from '../../Models/doctor.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patientCrUp-component',
  templateUrl: './patientCrUp.component.html',
  providers: [PatientService, DoctorService]
})

export class PatientCrUpComponent implements OnInit  {
    // Patient
    patient: IPatient = <IPatient>{};
    patients: IPatient[];
    patientsCPFs: IPatient[];
    patientsclean: IPatient[];
    doctors: IDoctor[];

    //Forms Variables
    formLabel: string;
    isEditMode: boolean = false;
    form: FormGroup;

  constructor(private patientService: PatientService, private doctorService: DoctorService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.form = fb.group({
      "name": ["", Validators.required],
      "cpf": ["", Validators.required],
      "birthDate": ["", Validators.required],
      "doctorId": ["", Validators.required],
      "dateCreated": [""],
    });
    this.formLabel = "Create Patient";
  }

  ngOnInit() {
    this.getDoctors();

    this.route.params.subscribe(parametros => {
      if (parametros['id']) {
        this.patientService.getPatientById(parametros['id']).subscribe(response => {
          this.edit(response);
        });
      }
    });
  }

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
      this.patient.dateCreated = this.form.controls["dateCreated"].value;
      this.patientService.updatePatient(this.patient)
        .subscribe(response => {
          alert("The Patient has been updated");
          this.form.reset();
          this.formLabel = "Create Patient";
        });
    } else {
      this.patientService.savePatient(this.patient)
        .subscribe(response => {
          alert("The Patient has been created");
          this.form.reset();
          this.formLabel = "Create Patient";
        });
    }
  };

  //Call the Doctr Service to get all the doctors to patients to Select
  private getDoctors() {
    this.doctorService.getDoctors().subscribe(
      data => this.doctors = data,
      error => alert(error)
    );
  }

  
  // copy the Patient to be updated
  edit(patientForm: IPatient) {
    this.formLabel = "Update Doctor";
    this.isEditMode = true;
    this.patient = patientForm;
    this.form.get("name")!.setValue(patientForm.name);
    this.form.get("cpf")!.setValue(patientForm.cpf);
    this.form.get("dateCreated")!.setValue(patientForm.dateCreated);
  }

  cancel() {
    this.formLabel = "Create Patient";
    this.isEditMode = false;
    this.patient = <IPatient>{};
    this.form.get("name")!.setValue('');
    this.form.get("cpf")!.setValue('');
    this.form.get("birthDate")!.setValue('');
  };
}
