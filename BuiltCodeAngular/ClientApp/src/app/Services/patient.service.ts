import { Injectable, Component, Pipe, Directive } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { IPatient } from '../Models/patient.interface';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()

export class PatientService {
  url = 'https://localhost:44387/api/v1/patients';

  // injetando o HttpClient
  constructor(private http: HttpClient) { }
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Get all patients
  getPatients(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get one Doctor By Id
  getPatientById(id: BufferSource): Observable<IPatient> {
    return this.http.get<IPatient>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Create one Doctor
  savePatient(doctor: IPatient): Observable<IPatient> {
    return this.http.post<IPatient>(this.url, JSON.stringify(doctor), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update one Doctor
  updatePatient(patient: IPatient): Observable<IPatient> {
    return this.http.put<IPatient>(this.url + '/' + patient.id, JSON.stringify(patient), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // delete one Doctor
  deletePatient(patientId: BufferSource) {
    return this.http.delete<IPatient>(this.url + '/' + patientId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Figure out some mistakes
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client Side Mistake
      errorMessage = error.error.message;
    } else {
      // Server Side Mistake
      errorMessage = `Error code: ${error.status}, ` + `message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
