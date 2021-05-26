import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService  } from 'src/@core/Service/AuthService/auth.service';
@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    myForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

  RequestAsArray: any = [ 'Staff', 'Vendor'];
  JobGroupArray: any = ['Not Applicable','Job Group A','Job Group B','Job Group C','Job Group D','Job Group E','Job Group F'];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public fb: FormBuilder,
        private authService: AuthService 
    ) {
        // redirect to home if already logged in

    }

    ngOnInit() {

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
        this.initializeForm(); 
    }


    initializeForm() {
        this.myForm = this.fb.group({

          firstName:         ['', Validators.required],
          lastName:          ['', Validators.required],
          email:             ['', Validators.required],
          phone:             ['', Validators.required],
          National_Id:       ['', Validators.required],
          jobGroup:          ['', Validators.required],
          jobId:             ['', Validators.required],
          requestAs:         ['', Validators.required],
          requestStatus:     ['Received'], 
          Status:            ['New'], 
          acceptTerms:       ['true'], 
          role:              ['Authenticated'], 
          password:          ['', Validators.required],
          confirmPassword:   ['', Validators.required],


        })
    }


    /* Reactive book form */
    submitData() {
        this.myForm = this.fb.group({

          firstName:         ['', [Validators.required]], 
          lastName:          ['', [Validators.required]],
          email:             ['', [Validators.required]],
          phone:             ['', [Validators.required]],
          National_Id:       ['', [Validators.required]],
          jobGroup:          ['', [Validators.required]],
          jobId:             ['', [Validators.required]],
          requestAs:         ['', [Validators.required]],
          requestStatus:     ['Received'], 
          Status:            ['New'], 
          acceptTerms:       ['true'], 
          role:              ['Authenticated'], 
          password:          ['', [Validators.required]],
          confirmPassword:   ['', [Validators.required]]


        })
    }





    // convenience getter for easy access to form fields
    get f() { return this.myForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.myForm.invalid) {
            return;

        this.loading = false;
        }


        this.authService.register(

          this.f.firstName.value,
          this.f.lastName.value,
          this.f.email.value,
          this.f.phone.value,
          this.f.National_Id.value,
          this.f.jobGroup.value,
          this.f.jobId.value,
          this.f.requestAs.value,
          this.f.requestStatus.value,
          this.f.Status.value,
          this.f.acceptTerms.value,
          this.f.role.value,
          this.f.password.value,
          this.f.confirmPassword.value,

        )
            .pipe(first())
            .subscribe(
                data => {
                  this.loading = true;

                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}