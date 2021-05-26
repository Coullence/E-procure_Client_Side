import { Injectable } from '@angular/core';
import { Employee } from '../../Models/Employee';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CountService {

  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

      //count New Staff
  countNewStaff() {
    let API_URL = `${this.endpoint}/count/countNewStaff`;
  
    return this.http.get(API_URL);
  }



  // count Employees
  employeeCount() {
    let API_URL = `${this.endpoint}/count/employee`;
  
    return this.http.get(API_URL);
  }
    //count Staff
  staffCount() {
    let API_URL = `${this.endpoint}/count/Staff`;
    return this.http.get(API_URL);
  }
    //count Suppliers
  suppliersCount() {
    let API_URL = `${this.endpoint}/count/Suppliers`;
  
    return this.http.get(API_URL);
  }


// Filter Count

  countNewEmployee() {
    let API_URL = `${this.endpoint}/count/countNewEmployee`;
    return this.http.get(API_URL);
  }

 countApproveEmployee() {
    let API_URL = `${this.endpoint}/count/countApproveEmployee`;
    return this.http.get(API_URL);
  }

  countunApproveEmployee() {
    let API_URL = `${this.endpoint}/count/countunApproveEmployee`;
    return this.http.get(API_URL);
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