import { Injectable } from '@angular/core';
import { Employee } from '../../Models/Employee';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Tender } from 'src/@core/Models/Tender';

@Injectable({
  providedIn: 'root'
})

export class TenderService {



  endpoint: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  createTender(data): Observable<any> {
    console.log("tenders", data);
    let API_URL = `http://localhost:4000/tenders/`;
    return this.http.post<any>(API_URL, data, { headers: this.headers, withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      ) 

  }


      CountOpenTenders() { 
    let API_URL = `http://localhost:4000/tenders//count/open`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }


      CountClosedTenders() { 
    let API_URL = `http://localhost:4000/tenders//count/closed`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }


  

    GetTenders(){ 
    let API_URL = `${this.endpoint}/tenders/`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }
      GetOpenTenders(){ 
    let API_URL = `${this.endpoint}/tenders/open`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }

  GetTenders_Requests(){ 
    let API_URL = `${this.endpoint}/tenders/requests`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }

     GetTenderId(id): Observable<any> {
    let API_URL = `${this.endpoint}/tenders/${id}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: true })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

        // Delete student
        DeleteRequests(id): Observable<any> {
          let API_URL = `${this.endpoint}/tenders/${id}`;
          return this.http.delete(API_URL)
            .pipe(
              catchError(this.errorMgmt)
            )
        }
  
    

  



    GetTendersByCategory(id) { 
    let API_URL = `${this.endpoint}/tenders/by_category/${id}`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }


    GetCategories(){ 
    let API_URL = `${this.endpoint}/categories/`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }


  // Update User
  updateCategory(id, data): Observable<any> {
  console.log("data", data);
  console.log("ID", id);
    let API_URL = `${this.endpoint}/categories/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    console.log("the error is", error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      console.log("Client side error", errorMessage);
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log("Server side error", errorMessage);
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }



}
