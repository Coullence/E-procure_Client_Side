import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { SupplierService } from 'src/@core/Service/SuppliersService/supplier.service';
import { InvoiceService } from 'src/@core/Service/InvoiceService/invoice.service';
import { NgForm, FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit {

  public supplierId = "";
  public supplierCompany = "";
  public supplierEmail = "";
  public supplierPhone ="";
  public supplierCategory = "";
  public itemUnitPrice= "";
  public Totals = "";
  public User = "";

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  requestsForm: FormGroup;


  public userId="";

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private supplierAPI: SupplierService,
    private invoiceAPI: InvoiceService,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog

  ) { }

    ngOnInit() {
    this.cleanForm();
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.supplierAPI.GetSupplierId(id).subscribe(data => {
    	[ 'supplierCompany','supplierEmail',
    	'supplierPhone','supplyStatus',
    	'createdAt','updatedAt','action'];
      this.supplierId = data._id;
      this.supplierCompany = data.supplierCompany;
      this.supplierEmail = data.supplierEmail;
      this.supplierPhone = data.supplierPhone;
      this.supplierCategory = data.supplierCategory;
      this.itemUnitPrice = data.quotation;

      this.requestsForm = this.fb.group({
    	supplierCompany: 	[this.supplierCompany],
    	supplierEmail:  	[this.supplierEmail],
    	supplierPhone: 		[this.supplierPhone],
    	supplierCategory: 	[this.supplierCategory],
   		item: 				['', [Validators.required]],
    	itemQuantity: 		['', [Validators.required]],
    	dateExpected: 		['', [Validators.required]],
    	Status: 			['New'],
    	Total: 				['22,000'],
    	supplierForeignId: 	[this.supplierId],
    

    

    });
            
    }) 

  }




  /* Reactive book form */
  cleanForm() {

	this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;

// console.log(this.getUser().this.supplierId);


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

  /* Submit book */
  submitRequestsForm() {
    if (this.requestsForm.valid) {
      this.invoiceAPI.regInvoice(this.requestsForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/hod/manageinvoices'))
      });
    }
  }


}