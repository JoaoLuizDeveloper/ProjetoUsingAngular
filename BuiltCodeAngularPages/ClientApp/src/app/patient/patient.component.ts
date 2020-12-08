import { Component } from '@angular/core';
import { PatientService } from "../Services/PatientService";
import { IPatient } from '../Models/patient.interface';

@Component({
  selector: 'app-patient-component',
  templateUrl: './patient.component.html'
})
export class PatientComponent {
  // Doctor
   patient: IPatient = <IPatient>{};
   patients: IPatient[] = [];

  constructor(private patientService: PatientService) {

  }

  private getDoctors() {
    this.patientService.getPatients()
      .subscribe(  data => this.patients = data,
      error => alert(error),
      () => console.log(this.patients)

    )
  }
  ngOnInit() {
    this.getDoctors();
  }
}
