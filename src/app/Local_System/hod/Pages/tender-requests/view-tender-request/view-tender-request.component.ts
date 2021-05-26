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


import { TenderService } from 'src/@core/Service/TenderService/tenders.service';

import { UpdateAccountDialogComponent } from 'src/app/welcome/Shared/update-account-dialog/update-account-dialog.component';

@Component({
  selector: 'app-view-tender-request',
  templateUrl: './view-tender-request.component.html',
  styleUrls: ['./view-tender-request.component.scss']
})
export class ViewTenderRequestComponent implements OnInit {
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
  public itemName="";
  public requestedItem= "";
  public vendorQuotation="";
  public itemQuantity= ""; 
  public staffForeignId ="";
  public vendorForeignId="";

  



  rejectForm: FormGroup;
  approveForm: FormGroup;
  procureForm: FormGroup;
  revokeForm: FormGroup;
  approveSupplier: FormGroup;



  ItemCategoryArray: any = ['Electricity Assets','Cleaning Essentials','IT & ICT Equipments','Office/Stationery Assets','Kitchen Essentials','Washroom Essentials','Office Room Essentials','Telphone Assets'];
 
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone, 
    private requestsAPI: RequestsService,
    private tenderReqAPI: TenderService,
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

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.tenderReqAPI.GetTenderId(id).subscribe(data => {  

      this.itemCategory= data.itemCategory;
      this.itemName= data.itemName;
      this.itemQuantity= data.itemQuantity;
      this.vendorQuotation= data.vendorQuotation;

      // getting data fro a particular user

      this.vendorForeignId=data.vendorForeignId; 

      this.authAPI.GetUserId(this.vendorForeignId).subscribe(data => {  
        var id = data.staffForeignId;

        this.userId = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.phone = data.phone;
        this.email = data.email;
        this.jobGroup = data.jobGroup;
        this.National_Id = data.National_Id;
        this.role = data.role;
        this.jobId = data.jobId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
  
      })






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
        role: ['Supplier'],
        itemName:  ['Approved'],
        itemCategory:  ['Approved'],
        itemQuantity:  ['Approved'],
        unitPrice:  ['Approved'],

      });
       this.procureForm = this.fb.group({
        requestStatus: ['Procure'],
        Status:  ['New'],
      });
       this.revokeForm = this.fb.group({
        requestStatus: ['Revoke'],
        Status:  ['New'],
      });


      this.approveSupplier = this.fb.group({
      

        requestStatus: ['Approved'],
        role: ['Supplier'],
        itemName:  [this.itemName],
        itemCategory:  [this.itemCategory],
        itemQuantity:  [this.itemQuantity],
        unitPrice:  [this.vendorQuotation],
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


updateTenderStatus(){
  
}


  approveUser() {
    this.loading = true;
  var id = this.actRoute.snapshot.paramMap.get('id');
  this.tenderReqAPI.GetTenderId(id).subscribe(data => {  
    this.vendorForeignId=data.vendorForeignId;  


    if (window.confirm('Are you sure you want to update this user?')) {
      this.authAPI.updateUser(this.vendorForeignId, this.approveSupplier.value).pipe(first())
     .subscribe(
       data => {
         console.log("hey its", this.approveSupplier.value);
         this.loading = false;
         this.ngZone.run(() => this.router.navigateByUrl('/Admin/managesuppliers'))
       },
       error => {
         this.loading = false;
         this.error = error;
       });
   }


  })


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
