

import { environment } from '../../../environments/environment';
import { User } from '../../Models/user';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  static getToken() {
      throw new Error("Method not implemented.");
  }
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;

  }

  register(
  
      firstName:         string, 
      lastName:          string, 
      email:             string, 
      phone:             string, 
      National_Id:       string, 
      jobGroup:          string, 
      jobId:             string, 
      requestAs:         string, 
      requestStatus:     string, 
      Status:            string, 
      acceptTerms:       string, 
      role:              string, 
      password:          string, 
      confirmPassword:   string,



  ) {
    return this.http.post<any>(`${environment.apiUrl}/accounts/register/`, { 
      firstName, 
      lastName, 
      email, 
      phone, 
      National_Id, 
      jobGroup, 
      jobId, 
      requestAs, 
      requestStatus, 
      Status, 
      acceptTerms, 
      role, 
      password, 
      confirmPassword
    }).pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  activate(token: string) {
    console.log("got called to activate");
    console.log("The backend", token);
    return this.http.post<any>(`http://localhost:4000/accounts/verify-email`, { token })
      .pipe(map(res => {
        return res;
      }));
  }




  login(email: string, password: string) {
    console.log("login got called")
    return this.http.post<any>(`${environment.apiUrl}/accounts/authenticate`, { headers: { Anonymous: 'skip' }, email, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.jwtToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(user.email)
          console.log(user.role)

        }
        return user;
      }));
  }

  getToken(){

return localStorage.getItem('jwtToken');

  }

  forgotPassword(email: string) {
    return this.http.post<any>(`${environment.apiUrl}/accounts/forgot-password`, {email})
    .pipe(map(res => {
      console.log("the res", res);
      return res;
    }));
  }


  resetPassword(token: string, password: string, confirmPassword: string) {
    return this.http.post<any>(`${environment.apiUrl}/accounts/reset-password`, {token, password, confirmPassword })
    .pipe(map(res => {
      return res;
    }));
  }

    // Get all AUthenticated users
  GetAuthenticatedUsers() { 
    let API_URL = `${environment.apiUrl}/accounts/authenticated`;
    return this.http.get(API_URL,  { withCredentials: true }).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt) 
      )
  }

  // Get Staff by ID
  GetUserId(id): Observable<any> {
    let API_URL = `${environment.apiUrl}/accounts/${id}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: true })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

    // Get Staff by ID
    GetStaff(): Observable<any> {
      let API_URL = `${environment.apiUrl}/accounts/staffs`;
      return this.http.get(API_URL, { headers: this.headers, withCredentials: true })
        .pipe(
          map((res: Response) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }

        // Get Staff by ID
        countStaff(): Observable<any> {
          let API_URL = `${environment.apiUrl}/accounts/staffs/count`;
          return this.http.get(API_URL, { headers: this.headers, withCredentials: true })
            .pipe(
              map((res: Response) => {
                return res || {}
              }),
              catchError(this.errorMgmt)
            )
        }


  // Update Order by Id
  updateUser(id, data): Observable<any> { 
    console.log("user id", id);
  console.log("data", data);
    let API_URL = `${environment.apiUrl}/accounts/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: true })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
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
