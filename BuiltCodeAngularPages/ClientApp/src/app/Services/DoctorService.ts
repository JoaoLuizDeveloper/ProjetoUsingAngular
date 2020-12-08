import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDoctor } from '../Models/doctor.interface';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()


export class DoctorService {

  constructor(private http: HttpClient) { }

        //Get
        getDoctors() {
          return this.http.get("api/1/doctors").pipe(map(data => { }));
        }

}
