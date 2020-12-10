import { Injectable, Component, Pipe, Directive } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IDoctor } from '../Models/doctor.interface';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()

export class DoctorService {
  url = 'https://localhost:44387/api/v1/doctors';

  // injetando o HttpClient
  constructor(private http: HttpClient) { }
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Get all the doctors
  getDoctors(): Observable<IDoctor[]> {
    var retorno = this.http.get<IDoctor[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError));
    return retorno;
  }

  // Get one Doctor By Id
  getDoctorById(id: BufferSource): Observable<IDoctor> {
    return this.http.get<IDoctor>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  
  // Create one Doctor
  saveDoctor(doctor: IDoctor): Observable<IDoctor> { 
    return this.http.post<IDoctor>(this.url, JSON.stringify(doctor), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Update one Doctor
  updateDoctor(doctor: IDoctor): Observable<IDoctor> {
    return this.http.patch<IDoctor>(this.url + '/' , JSON.stringify(doctor), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // delete one Doctor
  deleteDoctor(doctorId: BufferSource) {
    return this.http.delete<IDoctor>(this.url + '/' + doctorId, this.httpOptions)
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
