import { Injectable } from '@angular/core';
import { Employee } from '../../Models/Employee';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { User } from '../../Models/user';


@Injectable({
  providedIn: 'root'
})
export class AllUsersService {

  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }



  // Get all Employees
  GetUsers() {
    let API_URL = `${this.endpoint}/auth/`;
    return this.http.get(API_URL);
  }

  // Get student
  GetUserId(id): Observable<any> {

    console.log( 'id is', id);
    
    let API_URL = `${this.endpoint}/auth/user/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update user
  UpdateUser(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/auth/updateUser/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete student
  DeleteUser(id): Observable<any> {
    var API_URL = `${this.endpoint}/auth/delete${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}