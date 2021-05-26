import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { SupplierService } from 'src/@core/Service/SuppliersService/supplier.service';
import { InvoiceService } from 'src/@core/Service/InvoiceService/invoice.service';
import { NgForm, FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';


import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  config: ExportAsConfig = {
    type: 'pdf',
    
    elementIdOrContent: 'invoice',
    options: {
      jsPDF: {
        orientation: 'landscape'
      },
      pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  };

  public supplierId = "";
  public supplierCompany = "";
  public supplierEmail = "";
  public supplierPhone ="";
  public supplierAdress="";
  public supplierLocation="";
  public supplierCategory = "";
  public itemUnitPrice= "";
  public Total = "";
  public item = "";
  public itemQuantity = "";



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
    private exportAsService: ExportAsService,
    private supplierAPI: SupplierService,
    private invoiceAPI: InvoiceService,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog

  ) { }

    ngOnInit() {
    this.cleanForm();
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.invoiceAPI.getInvoiceId(id).subscribe(data => {
    	[ 'supplierCompany','supplierEmail',
    	'supplierPhone','supplyStatus',
    	'createdAt','updatedAt','action'];
      this.supplierId = data._id;
      this.supplierCompany = data.supplierCompany;
      this.supplierEmail = data.supplierEmail;
      this.supplierPhone = data.supplierPhone;
      this.supplierAdress = data.supplierAdress;
      this.supplierLocation = data.suppliersLocation;
      this.supplierCategory = data.supplierCategory;
      this.itemUnitPrice = data.quotation;
      this.item = data.item;
      this.itemQuantity = data.itemQuantity;
      this.Total = data.Total;
            
    }) 
  }



  /* Reactive book form */
  cleanForm() {

	this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;

    this.requestsForm = this.fb.group({
    	supplierCompany: 	[this.supplierCompany],
    	supplierEmail:  	[this.supplierEmail],
    	supplierPhone: 		[this.supplierPhone],
    	supplierAdress: 	[this.supplierAdress],
    	ssupplierLocation: 	[this.supplierLocation],
    	supplierCategory: 	[this.supplierCategory],
   		item: 				['', [Validators.required]],
    	itemQuantity: 		['', [Validators.required]],
    	dateExpected: 		['', [Validators.required]],
    	Status: 			['New'],
    	Total: 				['22,000'],
    	supplierForeignId: 	[this.supplierId],

    

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

  /* Submit book */
  submitRequestsForm() {
    if (this.requestsForm.valid) {
      this.invoiceAPI.regInvoice(this.requestsForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/hod/manageinvoices'))
      });
    }
  }



  ///Reports generator
    exportAsString(type: SupportedExtensions, opt?: string) {
    this.config.elementIdOrContent = '<div> test string </div>';
    this.exportAs(type, opt);
    setTimeout(() => {
      this.config.elementIdOrContent = 'invoice';
    }, 1000);
  }

  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;

    }
    this.exportAsService.save(this.config, '#Invoice').subscribe(() => {
      // save started
    });
    // this.exportAsService.get(this.config).subscribe(content => {
    //   const link = document.createElement('a');
    //   const fileName = 'export.pdf';

    //   link.href = content;
    //   link.download = fileName;
    //   link.click();
    //   console.log(content);
    // });
  }

  pdfCallbackFn (pdf: any) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    // for (let i = 1; i <= noOfPages; i++) {
    //   pdf.setPage(i);
    //   pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    // }
  }



}