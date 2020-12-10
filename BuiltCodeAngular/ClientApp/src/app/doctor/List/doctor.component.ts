import { Component, OnInit} from '@angular/core';
import { DoctorService } from '../../Services/doctor.service';
import { IDoctor } from '../../Models/doctor.interface';

@Component({
  selector: 'app-doctor-component',
  templateUrl: './doctor.component.html',
  providers: [DoctorService]
})
export class DoctorComponent implements OnInit {
    // Doctor
    doctor: IDoctor = <IDoctor>{};
    doctors: IDoctor[];
      
  constructor(private doctorService: DoctorService) { }
     
  ngOnInit() {
    this.getDoctors();    
  }

  // Call the service to get all the doctors
  private getDoctors() {
    this.doctorService.getDoctors().subscribe(
      data => this.doctors = data,
      error => alert(error)
    );
  }

  //Delete the Doctor
  delete(doctor: IDoctor) {
    if (confirm("You really want to delete this Doctor? You can't be able to recover it")) {
      this.doctorService.deleteDoctor(doctor.id)
        .subscribe(response => {
          alert("The Doctor has been deleted");
          this.getDoctors();
        });
    }
  };  
}
