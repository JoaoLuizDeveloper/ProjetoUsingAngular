import { Component, OnInit} from '@angular/core';
import { PatientService } from "../../Services/patient.service";
import { DoctorService } from "../../Services/doctor.service";
import { IPatient } from '../../Models/patient.interface';
import { IDoctor } from '../../Models/doctor.interface';

@Component({
  selector: 'app-patient-component',
  templateUrl: './patient.component.html',
  providers: [PatientService, DoctorService],
})
export class PatientComponent implements OnInit  {
    // Patient
    patient: IPatient = <IPatient>{};
    patients: IPatient[];

    // Doctor
    doctor: IDoctor = <IDoctor>{};
    doctors: IDoctor[];

  constructor(private patientService: PatientService, private doctorService: DoctorService) { }

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

  //Delete the Doctor
  delete(patient: IPatient) {
    if (confirm("You really want to delete this Patient? You can't be able to recover it")) {
      this.patientService.deletePatient(patient.id)
        .subscribe(response => {
          alert("The Patient has been deleted");
          this.getPatients();
        });
    }
  };  
}
