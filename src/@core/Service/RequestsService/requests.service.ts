import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RequestsService {

  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }


    createRequest(data): Observable<any> {
    let API_URL = `${environment.apiUrl}/requests/`; 
    console.log(data);
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: true }).pipe(map(res => {
        console.log("THis respond", res);
        return res || {}
      }),
      catchError(this.errorMgmt)  
    )
  }

    // Get all Request
  GetRequests() { 
    let API_URL = `${environment.apiUrl}/requests/`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }


  countRequests() { 
    let API_URL = `${environment.apiUrl}/requests/count`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  
  
  // Get Requestby ID
  GetRequestId(id): Observable<any> {
    let API_URL = `${environment.apiUrl}/requests/${id}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: true })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }



    GetRequestByStaffId(id): Observable<any> {
    let API_URL = `${environment.apiUrl}/requests/byStaffId${id}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: true })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
          // Get all Staffs
          GetApprovedRequestByStaffId(id) { 
            let API_URL = `${environment.apiUrl}/requests/approved/byStaffId${id}`;
            return this.http.get(API_URL,  { withCredentials: true }).pipe(
                map((res: Response) => {
                  return res || {}
                }),
                catchError(this.errorMgmt)
              )
          }
              // Get all Staffs
              GetRejectedRequestByStaffId(id) { 
        let API_URL = `${environment.apiUrl}/requests/rejected/byStaffId${id}`;
        return this.http.get(API_URL,  { withCredentials: true }).pipe(
            map((res: Response) => {
              return res || {}
            }),
            catchError(this.errorMgmt)
          )
      }

    // Update Request
  updateRequest(id, data): Observable<any> {
  console.log("data", data);
  console.log("id to serve", id);
    let API_URL = `${environment.apiUrl}/requests/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
    // Delete student
    DeleteRequests(id): Observable<any> {
      console.log("id is", id);
      var API_URL = `${environment.apiUrl}/requests/${id}`;
      return this.http.delete(API_URL)
        .pipe(
          catchError(this.errorMgmt)
        )
    }




















  // Add 
  AddRequests(data: Request): Observable<any> {
    let API_URL = `${this.endpoint}/create/regrequests`;
    console.log(data);
    return this.http.post(API_URL, data)
    
    
      .pipe(
        catchError(this.errorMgmt)
      ) 
  }


  // Get student
  GetRequestsId(id): Observable<any> {
    let API_URL = `${this.endpoint}/readId/readRequests/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update student
  UpdateRequests(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update/updateRequests/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
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