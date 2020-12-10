import { Component, OnInit} from '@angular/core';
import { DoctorService } from '../../Services/doctor.service';
import { IDoctor } from '../../Models/doctor.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctorcrup-component',
  templateUrl: './doctorcrup.component.html',
  providers: [DoctorService]
})
export class DoctorCrUpComponent implements OnInit {

  // Doctor
  doctor: IDoctor = <IDoctor>{};
  doctors: IDoctor[];

  //Forms Variables
  formLabel: string;
  isEditMode: boolean = false;
  form: FormGroup;

  constructor(private doctorService: DoctorService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.form = fb.group({
      "name": ["", Validators.required],
      "crm": ["", Validators.required],
      "crmuf": ["", Validators.required],
      "dateCreated": [""],
    });
    this.formLabel = "Create Doctor";
  }

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      if (parametros['id']) {
        this.doctorService.getDoctorById(parametros['id']).subscribe(response => {
          this.edit(response);
        });
      }
    });
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
      this.doctor.dateCreated = this.form.controls["dateCreated"].value;
      this.doctorService.updateDoctor(this.doctor)
        .subscribe(response => {
          alert("The Doctor has been updated");
          this.form.reset();
          this.formLabel = "Create Doctor";
          (<HTMLInputElement>document.getElementById("crmfim")).value = '';
        });
    } else {
      this.doctorService.saveDoctor(this.doctor)
        .subscribe(response => {
          alert("The Doctor has been created");
          this.form.reset();
          this.formLabel = "Create Doctor";
          (<HTMLInputElement>document.getElementById("crmfim")).value = '';
        });
    }
  };

  //Update the Doctor
  edit(doctorForm: IDoctor) {
    this.formLabel = "Update Doctor";
    this.isEditMode = true;
    this.doctor = doctorForm;
    this.form.get("name")!.setValue(doctorForm.name);
    this.form.get("crm")!.setValue(doctorForm.crm);
    this.form.get("crmuf")!.setValue(doctorForm.crmuf);
    this.form.get("dateCreated")!.setValue(doctorForm.dateCreated);
    (<HTMLInputElement>document.getElementById("crmfim")).value = doctorForm.crm + '-' + doctorForm.crmuf;
  };

  cancel() {
    this.formLabel = "Create Doctor";
    this.isEditMode = false;
    this.doctor = <IDoctor>{};
    this.form.get("name")!.setValue('');
    this.form.get("crm")!.setValue('');
    this.form.get("crmuf")!.setValue('');
    this.form.get("crmfim")!.setValue('');
    (<HTMLInputElement>document.getElementById("crmfim")).value = '';
  };
}
