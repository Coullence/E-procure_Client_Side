import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { first } from 'rxjs/operators';
import { EmployeeService } from 'src/@core/Service/EmployeesService/employees.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';


import { UpdateAccountDialogComponent } from './../Shared/update-account-dialog/update-account-dialog.component';


@Component({
  selector: 'app-supplier-request',
  templateUrl: './supplier-request.component.html',
  styleUrls: ['./supplier-request.component.scss']
})
export class SupplierRequestComponent implements OnInit {
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
  requestsForm: FormGroup;
  JobStatusArray: any = ['Available', 'Field Work', 'On Leave', 'Compulsory Leave'];

  public userId = "";
  public supplierFirstName = "";
  public supplierLastName = "";
  public supplierTitle = "";
  public supplierEmail = "";
  public supplierRegOn = "";
  public userData = "";
  public updateOn = "";

  SupplierRoleArray: any = ['Requests to be Supplier',];
  JobGroupArray: any = ['Job Group A', 'Job Group B', 'Job Group C', 'Job Group D', 'Job Group E', 'Job Group F'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private requestsApi: EmployeeService,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.cleanForm();

    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.supplierFirstName = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.supplierLastName = JSON.parse(localStorage.getItem('currentUser')).lastName;
    this.supplierTitle = JSON.parse(localStorage.getItem('currentUser')).title;
    this.supplierEmail = JSON.parse(localStorage.getItem('currentUser')).email;
    this.supplierRegOn = JSON.parse(localStorage.getItem('currentUser')).createdAt;
    this.updateOn = JSON.parse(localStorage.getItem('currentUser')).updatedAt;


    this.requestsForm = this.fb.group({
      supplierFirstName: [this.supplierFirstName],
      supplierLastName: [this.supplierLastName],
      supplierEmail: [this.supplierEmail],
      supplierPhone: ['', [Validators.required]],
      jobId: ['', [Validators.required]],
      KRA_Pin: ['', [Validators.required]],
      jobGroup: ['', [Validators.required]],
      National_Id: ['', [Validators.required]],
      requestAs: ['', [Validators.required]],
      Status: ['New'],
      approvalStatus: ['unApproved'],
      employeeForeignId: [this.userId],
    });

  }

  /* Reactive book form */
  cleanForm() {

    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;

    this.requestsForm = this.fb.group({

      fullName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required]],
      jobId: ['', [Validators.required]],
      jobGroup: ['', [Validators.required]],
      jobStatus: ['', [Validators.required]],
      Status: ['New'],
      approvalStatus: ['unApproved'],
      userForeignId: [this.userId]


    })
  }




  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.requestsForm.controls[controlName].hasError(errorName);
  }

  /* Submit book */
  submitRequestsForm() {
    if (this.requestsForm.valid) {
      this.requestsApi.createEmployee(this.requestsForm.value).pipe(first())
        .subscribe(
          data => {

            this.ngZone.run(() => this.router.navigateByUrl('/welcome'))

          },
          error => {
            this.error = error;
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