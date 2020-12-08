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

  // Get one Patient By Id
  getPatientById(id: AAGUID): Observable<IPatient> {
    return this.http.get<IPatient>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  // Create one Patient
  savePatient(patient: IPatient): Observable<IPatient> {
    return this.http.post<IPatient>(this.url, JSON.stringify(patient), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  // Update one Patient
  updatePatient(patient: IPatient): Observable<IPatient> {
    return this.http.put<IPatient>(this.url + '/' + patient.id, JSON.stringify(patient), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // delete one Doctor
  deletePatient(patient: IPatient) {
    return this.http.delete<IPatient>(this.url + '/' + patient.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }



  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Error code: ${error.status}, ` + `message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
