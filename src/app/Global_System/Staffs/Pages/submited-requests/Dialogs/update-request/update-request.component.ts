import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { first } from 'rxjs/operators';
import { RequestsService } from 'src/@core/Service/RequestsService/requests.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';


import { UpdateAccountDialogComponent } from 'src/app/welcome/Shared/update-account-dialog/update-account-dialog.component';



@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.scss']
})
export class UpdateRequestComponent implements OnInit {
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
  public phone = "";
  public email = "";
  public jobGroup = "";
  public jobId = "";
  public createdAt = "";
  public updatedAt = "";
  public userData = "";
  public updateOn = "";
  public itemCategory= "";
  public requestedItem= "";
  public itemQuantity= ""; 



  ItemCategoryArray: any = ['Electricity Assets','Cleaning Essentials','IT & ICT Equipments','Office/Stationery Assets','Kitchen Essentials','Washroom Essentials','Office Room Essentials','Telphone Assets'];
 
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private requestsAPI: RequestsService,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.cleanForm(); 

    this.userId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.firstName = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.lastName = JSON.parse(localStorage.getItem('currentUser')).lastName;
    this.phone = JSON.parse(localStorage.getItem('currentUser')).phone;
    this.email = JSON.parse(localStorage.getItem('currentUser')).email;
    this.jobGroup = JSON.parse(localStorage.getItem('currentUser')).jobGroup;
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

    })




  }

  /* Reactive book form */
  cleanForm() {

    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;

    this.formData = this.fb.group({

        itemCategory: ['', [Validators.required]],
        requestedItem: ['', [Validators.required]],
        itemQuantity: ['', [Validators.required]],
        requestStatus:  ['Received'],
        Status:  ['New'],
        staffForeignId: [this.userId],


    })
  }




  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  }



      /* Update book */
      submitData() {
        this.loading = true;
        var id = this.actRoute.snapshot.paramMap.get('id');
        console.log("snapshot id", id);
        if (window.confirm('Are you sure you want to update?')) {
          console.log("id front side", id);
          this.requestsAPI.updateRequest(id, this.formData.value).pipe(first())
          .subscribe(
              data => {
                this.loading = false;
                this.ngZone.run(() => this.router.navigateByUrl('/Staff/submitedRequest'))
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
