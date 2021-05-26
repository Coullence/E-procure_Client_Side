import { Injectable } from '@angular/core';
import { Employee } from '../../Models/Employee';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class EmployeeService {

  getToken() {

    return JSON.parse(localStorage.getItem('currentUser')).jwtToken;

  } 

  endpoint: string = 'http://localhost:5000';
  access_token = this.getToken();
  headers = new HttpHeaders().set('Content-Type', 'application/json');



  constructor(private http: HttpClient) { }
  
    AddEmployee(data: Employee): Observable<any> {
    let API_URL = `${this.endpoint}/employees/`;
    console.log(data);
    return this.http.post(API_URL, data, { withCredentials: true })


      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Add 
  createEmployee(data: Employee): Observable<any> {
    let API_URL = `${environment.apiUrl}/employees/`;
    console.log(data);
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: true }).pipe(map(res => {
        console.log("THis respond", res);
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Get all Employees
  GetEmployee() {

    console.log("accesstoken", this.access_token);
    let API_URL = `${environment.apiUrl}/employees/`;
    return this.http.get(API_URL, { withCredentials: true });
  }
  // GetvNew Employees
  GetNewEmployee() {
    let API_URL = `${this.endpoint}/read/readNewEmployee`;
    return this.http.get(API_URL, { withCredentials: true });
  }

  // Get student
  GetEmployeeId(id): Observable<any> {

    console.log('id is', id);
    let API_URL = `${this.endpoint}/employees/:${id}`;
    return this.http.get(API_URL, { withCredentials: true })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  updateUser(id, data): Observable<any> { 
    console.log("Hey data", data);
    console.log("server id ", id);
    let API_URL = `http://localhost:4000/accounts/5f50ba3c27a9da0b5684e67b`;
    return this.http.put(API_URL, data, { headers: this.headers } )
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  // Update student
  UpdateEmployee(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/employees/${id}`;
    return this.http.put(API_URL, data, { withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Update student
  updateEmployeeRole(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/employees/${id}`;
    return this.http.put(API_URL, data, { withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  updateEmployeeStatus(id): Observable<any> {
    let API_URL = `${this.endpoint}/employees/${id}`;
    return this.http.put(API_URL, { withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete student
  DeleteEmployee(id): Observable<any> {
    var API_URL = `${this.endpoint}/employees/${id}`;
    return this.http.delete(API_URL, { withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    console.log("got this", error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      console.log("client side error:",errorMessage );
      console.log("client side error:",error );
      console.log("client side error:",error.error );
      console.log("client side error:",error.error.message );
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log("server side error:",errorMessage );
      console.log("server side error:",error );
      console.log("server side error:",error.error );
      console.log("server side error:",error.error.message );
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
