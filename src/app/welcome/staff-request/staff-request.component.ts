import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { first } from 'rxjs/operators';
import { StaffService } from 'src/@core/Service/StaffsService/staffs.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';


import { UpdateAccountDialogComponent } from './../Shared/update-account-dialog/update-account-dialog.component';

@Component({
  selector: 'app-staff-request',
  templateUrl: './staff-request.component.html',
  styleUrls: ['./staff-request.component.scss']
})
export class StaffRequestComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  formData: FormGroup;
  JobStatusArray: any = ['Available', 'Field Work', 'On Leave', 'Compulsory Leave'];

  public userId = "";
  public staffFirstName = "";
  public staffLastName = "";
  public staffTitle = "";
  public staffEmail = "";
  public staffRegOn = "";
  public userData = "";
  public updateOn = "";

  StaffRoleArray: any = ['Requests to be Staff',];
  JobGroupArray: any = ['Job Group A', 'Job Group B', 'Job Group C', 'Job Group D', 'Job Group E', 'Job Group F'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private requestsAPI: StaffService,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.cleanForm();

    this.userId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.staffFirstName = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.staffLastName = JSON.parse(localStorage.getItem('currentUser')).lastName;
    this.staffTitle = JSON.parse(localStorage.getItem('currentUser')).title;
    this.staffEmail = JSON.parse(localStorage.getItem('currentUser')).email;
    this.staffRegOn = JSON.parse(localStorage.getItem('currentUser')).createdAt;
    this.updateOn = JSON.parse(localStorage.getItem('currentUser')).updatedAt;


    this.formData = this.fb.group({
      staffFirstName: [this.staffFirstName],
      staffLastName: [this.staffLastName],
      staffEmail: [this.staffEmail],
      staffPhone: ['', [Validators.required]],
      jobId: ['', [Validators.required]],
      KRA_Pin: ['', [Validators.required]],
      jobGroup: ['', [Validators.required]],
      National_Id: ['', [Validators.required]],
      requestAs: ['', [Validators.required]],
      Status: ['New'],
      approvalStatus: ['unApproved'],
      staffForeignId: [this.userId],
    });

  }

  /* Reactive book form */
  cleanForm() {

    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;

    this.formData = this.fb.group({

      fullName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required]],
      jobId: ['', [Validators.required]],
      jobGroup: ['', [Validators.required]],
      jobStatus: ['', [Validators.required]],
      Status: ['New'],
      approvalStatus: ['unApproved'],
      staffForeignId: [this.userId]


    })
  }




  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  }



      /* Update book */
      submitData() {
        this.loading = true;
        var id = JSON.parse(localStorage.getItem('currentUser')).id;
        if (window.confirm('Are you sure you want to update?')) {
          console.log("id front side", id);
          this.requestsAPI.createStaff(this.formData.value).pipe(first())
          .subscribe(
              data => {
                this.loading = false;
                this.ngZone.run(() => this.router.navigateByUrl('/welcome'))
              },
              error => {
                  this.error = error;
                  console.log("error is", this.error);
                  this.loading = false;
              });
        }
      }


  updateAccount() {
    this.dialog.open(UpdateAccountDialogComponent, {
      width: '800px',

    });

  }


}
