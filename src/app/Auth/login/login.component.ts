import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService  } from 'src/@core/Service/AuthService/auth.service';
import { NgZone } from '@angular/core';

@Component({ 
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone,
        private authService: AuthService 
    ) { 
        // redirect to home if already logged in
      
    }

    ngOnInit() {

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
        this.loginForm = this.formBuilder.group({
            email:    ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Auth/hod';

     
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.ngZone.run(() => this.router.navigateByUrl(data.role));

              
    







                    // if (this.authService.currentUserValue) { 

                    //     if (this.authService.currentUserValue['role'] == 'Authenticated') {
                    //         this.ngZone.run(() => this.router.navigateByUrl('/welcome'));
                    //         return true;

                    //     }

                    //     if (this.authService.currentUserValue['role'] == 'Staff') {
                    //         //return this.router.navigate(['/staffs']);
                    //            this.router.navigate(['/staffs']);
                    //            return true;
                    //     }
                    //     // supplier login
                    //     if (this.authService.currentUserValue['role'] == 'Supplier') {
                    //         // return this.router.navigate(['/supplier']);//supplier
                    //         return this.ngZone.run(() => this.router.navigateByUrl('/supplier'))

                    //     }

                    //     //Local system
                
                    //     if (this.authService.currentUserValue['role'] == 'hod') {
                            
                    //         //    return this.router.navigate(['/hod']);
                    //     //    return this.ngZone.run(() => this.router.navigate(['/hod']));
                    //        return this.route.snapshot.queryParams['/hod'];
                    //     }
                
                    //     if (this.authService.currentUserValue['role'] == 'Purchases Manager') {
                    //         // return this.router.navigate(['/purchases']);
                    //         return this.ngZone.run(() => this.router.navigateByUrl('/purchases'))
                    //     }
                
                    //     if (this.authService.currentUserValue['role'] == 'Requests Manager') {
                    //         // return this.router.navigate(['/requests']);
                    //         return this.ngZone.run(() => this.router.navigateByUrl('/requests'))
                    //     }
                
                    //     if (this.authService.currentUserValue['role'] == 'Store Manager') {
                    //         // return this.router.navigate(['/store']);
                    //         return this.ngZone.run(() => this.router.navigateByUrl('/store'))
                    //     }
                
                    //     if (this.authService.currentUserValue['role'] == 'Tender Manager') {
                    //         // return this.router.navigate(['/tenders']);
                    //         return this.ngZone.run(() => this.router.navigateByUrl('/tenders'))
                    //     }
                        

                       
                    // }
                },
                error => {
                    this.error = error;

                    console.log(this.error);

                    if (this.error == "Please, logon to your email to verify Sign-up process!"){
                        // return this.router.navigate(['/Auth/Need_Activation']); 
                        return this.ngZone.run(() => this.router.navigateByUrl('/Auth/Need_Activation'))
                    }
                    this.loading = false;
                });
    }
}