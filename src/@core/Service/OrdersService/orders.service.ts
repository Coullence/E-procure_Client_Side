import { Injectable } from '@angular/core';
import { Employee } from '../../Models/Employee';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Order } from 'src/@core/Models/Order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add Order
  AddOrder(data: Order): Observable<any> {
    let API_URL = `${this.endpoint}/create/regOrder`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Get all Order
  GetOrder() {
    let API_URL = `${this.endpoint}/read/order`;
    return this.http.get(API_URL);
  }

  // Get Order by Id
  GetOrderId(id): Observable<any> {
    let API_URL = `${this.endpoint}/readId/readOrder/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update Order by Id
  UpdateOrder(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/updateOrder/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete student
  DeleteOrder(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete/deleteOrder/${id}`;
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