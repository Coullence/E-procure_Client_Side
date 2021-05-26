import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Supplier } from 'src/@core/Models/Supplier';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SupplierService {

  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }


  // Get User by ID
  createSupplier(data): Observable<any> {
    console.log(data);
    let API_URL = `http://localhost:4000/staffs/`;
    return this.http.post<any>(API_URL, data, { headers: this.headers, withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      ) 
  }

  

  // Get all Staffs
  GetSuppliers() { 
    let API_URL = `${environment.apiUrl}/accounts/suppliers`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
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

  // Get Staff by ID
  GetSupplierId(id): Observable<any> {
    let API_URL = `${environment.apiUrl}/accounts/${id}`;
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
    let API_URL = `${environment.apiUrl}/accounts/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      )
  }













  // Add student
  AddSupplier(data: Supplier): Observable<any> {
    let API_URL = `${this.endpoint}/create/regSupplier`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }



  // Update student
  UpdateSupplier(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/supplier/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete student
  DeleteSupplier(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete/deleteSupplier/${id}`;
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