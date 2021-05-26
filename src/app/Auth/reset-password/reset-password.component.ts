import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService  } from 'src/@core/Service/AuthService/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    myForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    success = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService 
    ) { 
        // redirect to home if already logged in
      
    }

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            email:    ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Auth/hod';

     
    }

    // convenience getter for easy access to form fields
    get f() { return this.myForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.loading = true;

        // stop here if form is invalid
        if (this.myForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.forgotPassword(this.f.email.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.success = data.message;
                    this.loading = false;
                },
                error => {
                    this.error = error;
                    console.log(error);
                    this.loading = false;
                });
    }
}