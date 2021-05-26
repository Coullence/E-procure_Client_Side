import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { first } from 'rxjs/operators';
import { RequestsService } from 'src/@core/Service/RequestsService/requests.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

import { AuthService  } from 'src/@core/Service/AuthService/auth.service';



import { UpdateAccountDialogComponent } from 'src/app/welcome/Shared/update-account-dialog/update-account-dialog.component';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
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
  public firstName = "";
  public lastName = "";
  public email = "";
  public phone = "";
  public National_Id = "";
  public jobGroup = "";
  public role = "";
  public jobId = "";
  public createdAt = "";
  public updatedAt = "";
  public userData = "";
  public updateOn = "";
  public itemCategory= "";
  public requestedItem= "";
  public itemQuantity= ""; 
  public staffForeignId ="";



  rejectForm: FormGroup;
  approveForm: FormGroup;
  procureForm: FormGroup;
  revokeForm: FormGroup;



  ItemCategoryArray: any = ['Electricity Assets','Cleaning Essentials','IT & ICT Equipments','Office/Stationery Assets','Kitchen Essentials','Washroom Essentials','Office Room Essentials','Telphone Assets'];
 
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private requestsAPI: RequestsService,
    private authAPI:AuthService,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    // get snapshot id of request    
    var id = this.actRoute.snapshot.paramMap.get('id');
    // use id to fetch staff foreign id    
    this.requestsAPI.GetRequestId(id).subscribe(data => {  
      var id = data.staffForeignId;
    // use foreign id to lookup staff user and feein in variables.
            this.authAPI.GetUserId(id).subscribe(data => {  
            this.staffForeignId = data.staffForeignId;
            console.log("got data", data);
          // use foreign id to lookup staff user and feein in variables.


          })


    })

    this.userId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.firstName = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.lastName = JSON.parse(localStorage.getItem('currentUser')).lastName;
    this.phone = JSON.parse(localStorage.getItem('currentUser')).phone;
    this.email = JSON.parse(localStorage.getItem('currentUser')).email;
    this.jobGroup = JSON.parse(localStorage.getItem('currentUser')).jobGroup;
    this.National_Id = JSON.parse(localStorage.getItem('currentUser')).National_Id;
    this.role = JSON.parse(localStorage.getItem('currentUser')).role;
    this.jobId = JSON.parse(localStorage.getItem('currentUser')).jobId;
    this.createdAt = JSON.parse(localStorage.getItem('currentUser')).createdAt;
    this.updatedAt = JSON.parse(localStorage.getItem('currentUser')).updatedAt;

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.requestsAPI.GetRequestId(id).subscribe(data => {  


      this.itemCategory= data.itemCategory;
      this.requestedItem= data.requestedItem;
      this.itemQuantity= data.itemQuantity;


    this.formData = this.fb.group({
 
        itemCategory: [this.itemCategory],
        requestedItem: [this.requestedItem],
        itemQuantity: [this.itemQuantity],
        requestStatus:  ['Received'],
        Status:  ['New'],
        staffForeignId: [this.userId],

    });


      this.rejectForm = this.fb.group({
        requestStatus: ['Rejected'],
        Status:  ['New'],
      });
      this.approveForm = this.fb.group({
        requestStatus: ['Approved'],
        Status:  ['New'],
      });
       this.procureForm = this.fb.group({
        requestStatus: ['Procure'],
        Status:  ['New'],
      });
       this.revokeForm = this.fb.group({
        requestStatus: ['Revoke'],
        Status:  ['New'],
      });


    })




  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  }

    reject() {
    this.loading = true;
      var id = this.actRoute.snapshot.paramMap.get('id')
      if (window.confirm('Are you sure you want to Reject this requests?')) {
         this.requestsAPI.updateRequest(id, this.rejectForm.value).pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.ngZone.run(() => this.router.navigateByUrl('Admin/managerequests'))
          },
          error => {
            this.loading = false;
            this.error = error;
          });
      }
  }

  approve() {
    this.loading = true;
      var id = this.actRoute.snapshot.paramMap.get('id')
      if (window.confirm('Are you sure you want to approve this Request?')) {
         this.requestsAPI.updateRequest(id, this.approveForm.value).pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.ngZone.run(() => this.router.navigateByUrl('/Admin/managerequests'))
          },
          error => {
            this.loading = false;
            this.error = error;
          });
      }
  }

  procure() {
    this.loading = true;
      var id = this.actRoute.snapshot.paramMap.get('id')
      if (window.confirm('Are you sure you want to Procure this user?')) {
         this.requestsAPI.updateRequest(id, this.procureForm.value).pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.ngZone.run(() => this.router.navigateByUrl('/hod/managerequests'))
          },
          error => {
            this.loading = false;
            this.error = error;
          });
      }
  }

    revoke() {
    this.loading = true;
      var id = this.actRoute.snapshot.paramMap.get('id')
      console.log("the id", id);
      if (window.confirm('Are you sure you want to Revoke this user?')) {
         this.requestsAPI.updateRequest(id, this.revokeForm.value).pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.ngZone.run(() => this.router.navigateByUrl('/hod/managerequests'))
          },
          error => {
            this.loading = false;
            this.error = error;
          });
      }
  }
      







}
