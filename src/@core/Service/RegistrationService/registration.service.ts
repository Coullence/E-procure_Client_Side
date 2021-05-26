import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


import { api } from '../../../API/api';
import { User } from '../../Models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  endpoint: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Register User
  registerUser(data: User): Observable<any> {
    console.log(data);
    console.log("got called frontend");
    let API_URL = `${this.endpoint}/accounts/register/`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  } 

    // Update User
  updateUser(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/updateUserAccount/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
    // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
