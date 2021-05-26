
// RxJs 6.x+ import paths
import { first, filter, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Component, OnDestroy, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Order } from 'src/@core/Models/Order';
import { OrderService } from 'src/@core/Service/OrdersService/orders.service';
import { StoreService } from 'src/@core/Service/StoreService/store.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { CountService } from 'src/@core/Service/Count/count.service';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';


@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnDestroy, OnInit {

  private ngUnsubscribe = new Subject();  
  newStaff: Object;
  noStaff: Object;
  dataCount: Object;
  public Status = "";
  public cssClass = "";
  public statusBadgeEnough = "";
  public statusBadgeMedium = "";
  public statusBadgeLow = "";

  loading = false;

    config: ExportAsConfig = {
    type: 'pdf',
    
    elementIdOrContent: 'myData',
    options: {
      jsPDF: {
        orientation: 'landscape'
      },
      pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  };


  categories: any = [];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [
  		
  		'Status',
  		'categoryName',
        'createdAt',
        'updatedAt',
      	'action'
  ];
  searchKey: string;

  requestsForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    public countService: CountService,
    private exportAsService: ExportAsService,
    private dialog: MatDialog,
    private requestAPI: StoreService
  ) {
  
    // this.requestAPI.GetItems().subscribe(data => {
     
    // this.loading = false;
    //   console.log(data);
    //   // this.List = this.List.filter(item => item.type === 'Vehicle');
    //   // this.data = this.data.filter(Staff => Staff.approvalStatus === 'Approved');
    //   this.StaffData = data;


    //   this.dataSource = new MatTableDataSource<Order>(this.StaffData);
    //   setTimeout(() => {
    //     this.dataSource.paginator = this.paginator;
    //   }, 0);
    // });

    this.requestAPI.GetCategories().subscribe(data => {
    this.loading = false;
      this.categories = data;
      console.log("categories", this.categories);
      this.dataSource = new MatTableDataSource<Order>(this.categories);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })

    }

  ngOnInit(): void {
    this.loading = true;
    this.updateNewStaffCount();
    this.countService.countNewStaff().pipe(first(
      // takeUntil(),
    )).subscribe(count => {
      this.dataCount = count;
      if (this.dataCount == 0) {
        this.noStaff = this.dataCount;
      } else {

        this.newStaff = this.dataCount;

      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



  //function to update status if quantity is low.

  //find all Items where quantity is less than 10 
  //update status to low

  //find all items where quantity is less 20
  //update status to Medium

    addCategory(){
    this.dialog.open(AddCategoryDialogComponent, {
      width: '600px',

    });

  }




  deleteElement(index: number, e){
    if(window.confirm('Are you sure to delete?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.requestAPI.DeleteRequests(e._id).subscribe()
    }
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }






  /* Submit book */
  updateNewStaffCount() {
  
  }

  /* Update book */
  // updateRequestsForm() {
  //   var id = this.userId 
  //     this.staffAPI. UpdateStaffRole(id, this.requestsForm.value).subscribe(res => {
  //       this.ngZone.run(() => this.router.navigateByUrl('/Admin/managestaffs'))

  //     });
  // }



  exportAs(type: SupportedExtensions, opt?: string) {
    this.loading = true;
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;

    }
    this.exportAsService.save(this.config, 'myFile').subscribe(() => {
      // save started
      this.loading = false;
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
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    }
  }

}
