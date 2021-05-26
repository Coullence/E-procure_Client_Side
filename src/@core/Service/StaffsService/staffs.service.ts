import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Employee } from 'src/@core/Models/Employee';
import { Staff } from 'src/@core/Models/Staff';

@Injectable({
  providedIn: 'root'
})


export class StaffService {

  endpoint: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }


  // Get User by ID
  createStaff(data: Staff): Observable<any> {
    console.log(data);
    let API_URL = `http://localhost:4000/staffs/`;
    return this.http.post<any>(API_URL, data, { headers: this.headers, withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      ) 
  }

  DeleteRequests(id): Observable<any> {
    let API_URL = `${this.endpoint}/accounts/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Staffs
  GetStaffs() { 
    let API_URL = `${this.endpoint}/accounts/staffs`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }
  // Get Staff by ID
  GetStaffId(id): Observable<any> {
    let API_URL = `${this.endpoint}/accounts/${id}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: true })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  // Update User
  updateUser(id, data): Observable<any> {
  console.log("data", data);
  console.log("ID", id);
    let API_URL = `${this.endpoint}/accounts/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  // Update Order by Id
  // updateUser(id, data): Observable<any> { 
  //   console.log("user id", id);
  //   let API_URL = `${environment.apiUrl}/accounts/${id}`;
  //   return this.http.put(API_URL, data, { headers: this.headers, withCredentials: true })
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }





  // Update Staff
  UpdateStaff(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/staff/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Update Staff
  UpdateStaffRole(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/updateStaffRole/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Update Staff

  updateStaffStatus(): Observable<any> {
    console.log('Got called!')
    let API_URL = `${this.endpoint}/update/updateStaffStatus/`;
    return this.http.put(API_URL, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete student
  DeleteStaff(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete/deleteStaff/${id}`;
    return this.http.delete(API_URL)
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
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
