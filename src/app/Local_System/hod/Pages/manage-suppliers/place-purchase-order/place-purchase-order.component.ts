import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { first } from 'rxjs/operators';
import { RequestsService } from 'src/@core/Service/RequestsService/requests.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

 
import { UpdateAccountDialogComponent } from 'src/app/welcome/Shared/update-account-dialog/update-account-dialog.component';
import { StoreService } from 'src/@core/Service/StoreService/store.service';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/@core/Models/Order';
import { TenderService } from 'src/@core/Service/TenderService/tenders.service';
import { AuthService } from 'src/@core/Service/AuthService/auth.service';
import { InvoiceService } from 'src/@core/Service/InvoiceService/invoice.service';

@Component({
  selector: 'app-place-purchase-order',
  templateUrl: './place-purchase-order.component.html',
  styleUrls: ['./place-purchase-order.component.scss']
})
export class PlacePurchaseOrderComponent implements OnInit {
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
  itemCategory: any;
  itemName: any;
  unitPrice: any;

  // ItemCategoryArray: any = ['Electricity Assets','Cleaning Essentials','IT & ICT Equipments','Office/Stationery Assets','Kitchen Essentials','Washroom Essentials','Office Room Essentials','Telphone Assets'];
   // set date
   minDate = new Date();

   dateFilter = date => {
     const day = date.getDay();
     return day != 0 && day != 6;
   }
  supplierId: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private requestsAPI: RequestsService,
    private storeAPI: StoreService,
    private dialog: MatDialog,
    private tendersAPI: TenderService,

    private invoiceAPI: InvoiceService,
    private authAPI:AuthService,
    private actRoute: ActivatedRoute,
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

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.authAPI.GetUserId(id).subscribe(data => {  
      var id = data.staffForeignId;

    this.supplierId = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.email = data.email;
    this.jobGroup = data.jobGroup;
    this.jobId = data.jobId;
    this.itemCategory = data.itemCategory;
    this.unitPrice = data.unitPrice;
    this.itemName = data.itemName;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;


    this.formData = this.fb.group({
 

    supplierCompany: ['Computer Dealers'],
    supplierEmail: [this.email],
    supplierPhone: [this.phone],
    itemCategory:[this.itemCategory],
    item: [this.itemName],
    itemUnitPrice: [this.unitPrice],
    Total:[this.unitPrice * 809],
    Status: ["New"],
    itemQuantity: ['', [Validators.required]],
    dateExpected: [this.updatedAt ],
    supplierForeignId: [this.supplierId],
    });
  });




  }

  /* Reactive book form */
  cleanForm() {

    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;

    this.formData = this.fb.group({

      supplierCompany: ['Computer Dealers'],
      supplierEmail: [this.email],
      supplierPhone: [this.phone],
      itemCategory:[this.itemCategory],
      item: [this.itemName],
      itemUnitPrice: [this.unitPrice],
      Total:[this.unitPrice * 12.8],
      Status: ["New"],
      itemQuantity: ['', [Validators.required]],
      dateExpected: [''],
      supplierForeignId: [this.supplierId],


    })
  }




  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    console.log("correct this", controlName);
    return this.formData.controls[controlName].hasError(errorName);
  }





      submitData() {
      this.loading = true;
        if (window.confirm('Are you sure you want to place this order?')) {
           this.invoiceAPI.generateInvoice(this.formData.value).pipe(first())
          .subscribe(
            data => {
              this.loading = false;
              this.ngZone.run(() => this.router.navigateByUrl('/Admin/manageinvoices'))

            console.log(this.formData.value);
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
