import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPatient } from '../Models/patient.interface';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';


@Injectable()


export class PatientService {

  constructor(private http: HttpClient) { }

        //Get
        getPatients() {
          return this.http.get("api/1/patients").pipe(map(data => { }));
        }
}
