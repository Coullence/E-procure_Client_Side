import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { RequestsService } from 'src/@core/Service/RequestsService/requests.service';
import { NgForm, FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

import { RegistrationService } from 'src/@core/Service/RegistrationService/registration.service';

@Component({
  selector: 'app-reg-dialog',
  templateUrl: './reg-dialog.component.html',
  styleUrls: ['./reg-dialog.component.scss']
})
export class RegDialogComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  loading = false;
  error = '';


  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  myForm: FormGroup;
  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private registrationAPI: RegistrationService,
    private dialog: MatDialog
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.myForm= this.fb.group({

      username:     ['', [Validators.required]],
      fullname:     ['', [Validators.required]],
      phone:        ['', [Validators.required]],
      altphone:     [''],
      email:        ['', [Validators.required]],
      role:         ['Default'],
      confPassword: ['', [Validators.required]],
      password:     ['', [Validators.required]],


    })
  }

 
  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitRequestsForm() {
    if (this.myForm.valid) {

      this.loading = true;
      this.registrationAPI.registerUser(this.myForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/Auth/login'))
      });
    }
  }


}