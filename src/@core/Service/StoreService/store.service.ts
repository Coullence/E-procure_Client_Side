import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Employee } from 'src/@core/Models/Employee';
import { Staff } from 'src/@core/Models/Staff';

@Injectable({
  providedIn: 'root'
})
export class StoreService {



  endpoint: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  createCategory(data): Observable<any> {
    let API_URL = `http://localhost:4000/categories/`;
    return this.http.post<any>(API_URL, data, { headers: this.headers, withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      ) 

  }


  addItem(data): Observable<any> {
    console.log("data", data); 
    let API_URL = `http://localhost:4000/items/`;
    return this.http.post<any>(API_URL, data, { headers: this.headers, withCredentials: true })
      .pipe(
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

      // Delete student
      DeleteRequests(id): Observable<any> {
        console.log("got called!");
        let API_URL = `${this.endpoint}/categories/${id}`;
        return this.http.delete(API_URL)
          .pipe(
            catchError(this.errorMgmt)
          )
      }

      

  

  

    GetItems() { 
    let API_URL = `${this.endpoint}/items/`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }

      CountItems() { 
    let API_URL = `${this.endpoint}/items/count`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }

      CountNewItems() { 
    let API_URL = `${this.endpoint}/items/count/new`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }


    GetItemsByCategory(id) { 
    let API_URL = `${this.endpoint}/items/by_category/${id}`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }

   GetCategoryId(id): Observable<any> {
    let API_URL = `${this.endpoint}/categories/${id}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: true })
      .pipe(
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
