import { Component, OnInit} from '@angular/core';
import { PatientService } from "../../Services/patient.service";
import { DoctorService } from "../../Services/doctor.service";
import { IPatient } from '../../Models/patient.interface';
import { IDoctor } from '../../Models/doctor.interface';

@Component({
  selector: 'app-patientMedico-component',
  templateUrl: './patientMedico.component.html',
  providers: [PatientService, DoctorService],
})

export class PatientMedicoComponent implements OnInit  {
    // Patient
    patient: IPatient = <IPatient>{};
    patients: IPatient[];

    // Doctor
    doctor: IDoctor = <IDoctor>{};
    doctors: IDoctor[];

  constructor(private patientService: PatientService, private doctorService: DoctorService) { }

  ngOnInit() {
    this.getDoctors();   
  }

  //Call the service to get all the patients
  private getPatientsbyDoctor(doctorId) {
    this.patientService.getPatientByDoctor(doctorId).subscribe(
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

  onChange(doctorId) {
    this.getPatientsbyDoctor(doctorId);
  }
}
