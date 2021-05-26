import { Injectable } from '@angular/core';
import { User } from '../../Models/user';
import { Employee } from '../../Models/Employee';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add 
  AddEmployee(data: Employee): Observable<any> {
    let API_URL = `${this.endpoint}/create/regEmployee`;
    console.log(data);
    return this.http.post(API_URL, data)
    
    
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Users
  GetUsers() {
    let API_URL = `${this.endpoint}/read/users`;
    return this.http.get(API_URL);
  }

  // Get all Users
  GetStaffs() {
    let API_URL = `${this.endpoint}/read/users`;
    return this.http.get(API_URL);
  }

  // Get user
  GetUserId(id): Observable<any> {

    console.log( 'id is', id);
    
    let API_URL = `${this.endpoint}/readId/readUser/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update User
  UpdateUser(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/updateUser/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete User
  DeleteUser(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete/deleteUser/${id}`;
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