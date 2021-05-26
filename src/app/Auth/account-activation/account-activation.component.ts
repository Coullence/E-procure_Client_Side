import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService  } from 'src/@core/Service/AuthService/auth.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService 
  ) { 
      // redirect to home if already logged in
    
  }

  ngOnInit() {
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



                  
                  if (this.authService.currentUserValue) { 

                      if (this.authService.currentUserValue['role'] == 'Default') {
                          this.router.navigate(['/welcome']);
                      }

                      if (this.authService.currentUserValue['role'] == 'Staff') {
                          this.router.navigate(['/staffs']);
                      }
                      // supplier login
                      if (this.authService.currentUserValue['role'] == 'Supplier') {
                          this.router.navigate(['/supplier']);//supplier

                      }

                      //Local system
              
                      if (this.authService.currentUserValue['role'] == 'hod') {
                          this.router.navigate(['/hod']);
                      }
              
                      if (this.authService.currentUserValue['role'] == 'Purchases Manager') {
                          this.router.navigate(['/purchases']);
                      }
              
                      if (this.authService.currentUserValue['role'] == 'Requests Manager') {
                          this.router.navigate(['/requests']);
                      }
              
                      if (this.authService.currentUserValue['role'] == 'Store Manager') {
                          this.router.navigate(['/store']);
                      }
              
                      if (this.authService.currentUserValue['role'] == 'Tender Manager') {
                          this.router.navigate(['/tenders']);
                      }
                      

                     
                  }
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }
}