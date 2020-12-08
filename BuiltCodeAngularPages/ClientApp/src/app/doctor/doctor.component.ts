import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { DoctorService } from '../Services/DoctorService';
import { IDoctor } from '../Models/doctor.interface';
import { error } from 'console';

@Component({
  selector: 'app-doctor-component',
  templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit {

  // Doctor
  private doctor: IDoctor = <IDoctor>{};
  private doctors: IDoctor[] = [];

  constructor(private doctorService: DoctorService) {

  }

  private getDoctors() {
    this.doctorService.getDoctors().subscribe(
      data => this.doctors = data,
      error => alert(error),
      () => console.log(this.doctors)

    );
  }
  ngOnInit() {
    this.getDoctors();
  }
}
