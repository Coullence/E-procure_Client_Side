import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { first } from 'rxjs/operators';
import { RequestsService } from 'src/@core/Service/RequestsService/requests.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

 
import { UpdateAccountDialogComponent } from 'src/app/welcome/Shared/update-account-dialog/update-account-dialog.component';
import { StoreService } from 'src/@core/Service/StoreService/store.service';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/@core/Models/Order';
import { TenderService } from 'src/@core/Service/TenderService/tenders.service';



@Component({
  selector: 'app-tender-request',
  templateUrl: './tender-request.component.html',
  styleUrls: ['./tender-request.component.scss']
})
export class TenderRequestComponent implements OnInit {
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
  ItemCategoryArray: {};
  dataSource: MatTableDataSource<Order>;
  paginator: any;
  StaffData: Order[];

  // ItemCategoryArray: any = ['Electricity Assets','Cleaning Essentials','IT & ICT Equipments','Office/Stationery Assets','Kitchen Essentials','Washroom Essentials','Office Room Essentials','Telphone Assets'];
 
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private requestsAPI: RequestsService,
    private storeAPI: StoreService,
    private dialog: MatDialog,
    private tendersAPI: TenderService
  ) { }
  ngOnInit() {

    this.storeAPI.GetCategories().subscribe(data => {
      this.loading = false;
        this.ItemCategoryArray = data;
        this.dataSource = new MatTableDataSource<Order>(this.StaffData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      })


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


    this.formData = this.fb.group({
 
      tenderStatus: ["Tender_Request"],
      itemCategory: ['', [Validators.required]],
      itemName: ['', [Validators.required]],
      itemQuantity: ['', [Validators.required]],
      vendorQuotation: ['', [Validators.required]],
      vendorForeignId: [this.userId],

    });

  }

  /* Reactive book form */
  cleanForm() {

    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;

    this.formData = this.fb.group({

        tenderStatus: ["Tender_Request"],
        itemCategory: ['', [Validators.required]],
        itemName: ['', [Validators.required]],
        itemQuantity: ['', [Validators.required]],
        vendorQuotation: ['', [Validators.required]],
        vendorForeignId: [this.userId],


    })
  }




  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  }





      submitData() {
      this.loading = true;
        if (window.confirm('Are you sure you want to place this order?')) {
           this.tendersAPI.createTender(this.formData.value).pipe(first())
          .subscribe(
            data => {
              this.loading = false;
              this.ngZone.run(() => this.router.navigateByUrl('/Vendor'))
            },
            error => {
              this.loading = false;
              this.error = error;
            });
        }
    }
  


  updateAccount() {
    this.dialog.open(UpdateAccountDialogComponent, {
      width: '800px',

    });

  }


}
