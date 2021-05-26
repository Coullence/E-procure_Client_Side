import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { EmployeeService } from 'src/@core/Service/EmployeesService/employees.service';
import { AuthService } from 'src/@core/Service/AuthService/auth.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router, ActivatedRoute } from '@angular/router';

import { StaffService } from 'src/@core/Service/StaffsService/staffs.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-view-suppliers-detail',
  templateUrl: './view-suppliers-detail.component.html',
  styleUrls: ['./view-suppliers-detail.component.scss']
})
export class ViewSuppliersDetailComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  requestsForm: FormGroup;
  rejectForm: FormGroup;
  approveForm: FormGroup;
  revokeForm: FormGroup;
  JobStatusArray: any = ['Available', 'Field Work', 'On Leave', 'Compulsory Leave'];

      public snapId = "";
      public  staffId           = "";
      public  Status           = "";    
      public  firstName         = "";
      public  lastName          = ""; 
      public  email             = "";
      public  phone             = ""; 
      public  National_Id       = "";
      public  jobGroup          = "";
      public  jobId             = "";
      public  requestAs         = ""; 
      public  requestStatus     = ""; 
      public  acceptTerms       = "";
      public  role              = "";
      public  staffForeignId    = "";
      public  createdAt         = "";
      public  updatedAt         = "";
      loading: boolean;
      error: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private staffAPI: StaffService,
    private authAPI: AuthService,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  ngOnInit() {

    var id = this.actRoute.snapshot.paramMap.get('id');

    this.snapId = id;
    this.staffAPI.GetStaffId(id).subscribe(data => {  
      this.staffId = data._id;
      this.firstName= data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.phone = data.phone;
      this.National_Id = data.National_Id;
      this.jobGroup = data.jobGroup;
      this.jobId = data.jobId;
      this.requestAs = data.requestAs;
      this.requestStatus = data.requestStatus;
      this.Status = data.Status;
      this.acceptTerms = data.acceptTerms;
      this.role = data.role;
      this.staffForeignId = data.staffForeignId;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;


      this.requestsForm = this.fb.group({
        role: [this.requestAs],

      })
      this.rejectForm = this.fb.group({
        role: ["Autenticated"],
        requestStatus: ["Rejected"], 
      })
      this.approveForm = this.fb.group({
        role: [this.requestAs],
        requestStatus: ["Approved"],
      })
      this.revokeForm = this.fb.group({
        role: ["Authenticated"],
        requestStatus: ["Revoked"],
      })
      

    })

  }




  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.requestsForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.requestsForm.controls[controlName].hasError(errorName);
  }


  rejectRequest() {
    this.loading = true;
      var id = this.actRoute.snapshot.paramMap.get('id')
      if (window.confirm('Are you sure you want to Reject this user?')) {
         this.authAPI.updateUser(id, this.rejectForm.value).pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.ngZone.run(() => this.router.navigateByUrl('/Admin/managestaffs'))
          },
          error => {
            this.loading = false;
            this.error = error;
          });
      }
  }

  approveUser() {
    this.loading = true;
      var id = this.actRoute.snapshot.paramMap.get('id')
      if (window.confirm('Are you sure you want to update this user?')) {
         this.authAPI.updateUser(id, this.approveForm.value).pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.ngZone.run(() => this.router.navigateByUrl('/Admin/managestaffs'))
          },
          error => {
            this.loading = false;
            this.error = error;
          });
      }
  }

  revokeUser() {
    this.loading = true;
      var id = this.actRoute.snapshot.paramMap.get('id')
      if (window.confirm('Are you sure you want to Revoke this user?')) {

              if (window.confirm('You are about to loose the data, want to procees?')) {
                     if (window.confirm('if you do this you wont be able to retrieve.Proced?')) {
                 this.authAPI.updateUser(id, this.revokeForm.value).pipe(first())
                .subscribe(
                  data => {
                    this.loading = false;
                    this.ngZone.run(() => this.router.navigateByUrl('/Admin/managestaffs'))
                  },
                  error => {
                    this.loading = false;
                    this.error = error; 
                  });
              }
            }
      }
  }



  /* Submit book */
  submitRequestsForm() {
    // if (this.requestsForm.valid) {
    //   this.employeeAPI.AddEmployee(this.requestsForm.value).subscribe(res => {
    //     this.ngZone.run(() => this.router.navigateByUrl('/welcome'))
    //   });
    // }
  }

  /* Update book */
  updateUser() {
    //   var userId = this.actRoute.snapshot.paramMap.get('id')
    //   this.employeeAPI.GetEmployeeId(userId).subscribe(data => {
    //   // var id = data.employeeForeignId;
    //   var id = "5f50ba3c27a9da0b5684e67b";
    //   if (window.confirm('Are you sure you want to update?')) {
    //     console.log("id front", id);
    //     this.employeeAPI.updateUser(id, this.requestsForm.value).subscribe( res => {
    //       this.ngZone.run(() => this.router.navigateByUrl('/Admin/manageemployees'))

    //     });
    //   }
    // })

  }
}
