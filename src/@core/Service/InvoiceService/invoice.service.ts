import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Invoice } from 'src/@core/Models/Invoice';
import { environment } from 'src/environments/environment';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }





  generateInvoice(data): Observable<any> {
    let API_URL = `http://localhost:4000/invoices/`; 
    console.log(data);
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: true }).pipe(map(res => {
        console.log("THis respond", res);
        return res || {}
      }),
      catchError(this.errorMgmt)  
    )
  }





      // Get all Request
      GetInvoices() { 
        let API_URL = `${environment.apiUrl}/invoices/`;
        return this.http.get(API_URL,  { withCredentials: true }).pipe(
            map((res: Response) => {
              return res || {}
            }),
            catchError(this.errorMgmt)
          )
      }
  // Get Requestby ID
  GetInvoiceId(id): Observable<any> {
    let API_URL = `${environment.apiUrl}/invoices/${id}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: true })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }


    // Get Requestby ID
    GetInvoiceBySupplier(id): Observable<any> {
      console.log("this is id", id);
      let API_URL = `${environment.apiUrl}/invoices/for/supplier/${id}`;
      return this.http.get(API_URL, { headers: this.headers, withCredentials: true })
        .pipe(
          map((res: Response) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }
  
      
      

  // Add Invoice
  regInvoice(data: Invoice): Observable<any> {
    let API_URL = `${this.endpoint}/create/regInvoice/`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Invoices
  getInvoice() {
    let API_URL = `${this.endpoint}/read/invoice`;
    return this.http.get(API_URL);
  }

  // Get Invoice by id
  getInvoiceId(id): Observable<any> {
    let API_URL = `${this.endpoint}/readId/readInvoice/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update Invoice
  updateInvoice(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/invoice/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
    // Update Invoice Status
  
  updateInvoiceStatus(): Observable<any> {
    console.log('Got called!')
    let API_URL = `${this.endpoint}/update/updateInvoiceStatus/`;
    return this.http.put(API_URL, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Invoice
  deleteInvoice(id): Observable<any> {
    var API_URL = `http://localhost:4000/invoice/delete/deleteInvoice/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }



  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      console.log("got this", error);
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log("got this", error);
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}