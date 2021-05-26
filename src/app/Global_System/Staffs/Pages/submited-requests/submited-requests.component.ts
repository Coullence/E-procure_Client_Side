
// RxJs 6.x+ import paths
import { first, filter, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Component, OnDestroy, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Request } from 'src/@core/Models/Requests';
import { OrderService } from 'src/@core/Service/OrdersService/orders.service';
import { RequestsService } from 'src/@core/Service/RequestsService/requests.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { CountService } from 'src/@core/Service/Count/count.service';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';

@Component({
  selector: 'app-submited-requests',
  templateUrl: './submited-requests.component.html',
  styleUrls: ['./submited-requests.component.scss']
})
export class SubmitedRequestsComponent implements OnDestroy, OnInit {

  private ngUnsubscribe = new Subject(); 
  newStaff: Object;
  noStaff: Object;
  dataCount: Object;

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



  RequestData: any = [];
  dataSource: MatTableDataSource<Request>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [

    'Status',
    'itemCategory',
    'requestedItem',
    'itemQuantity',
    'requestStatus',
    'createdAt',
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
    private requestsAPI: RequestsService
  ) {

    var id = JSON.parse(localStorage.getItem('currentUser')).id;
    this.requestsAPI.GetRequestByStaffId(id).subscribe(data => {

    this.loading = false;
      console.log(data);
      // this.List = this.List.filter(item => item.type === 'Vehicle');
      // this.data = this.data.filter(Staff => Staff.approvalStatus === 'Approved');
      this.RequestData = data;
      this.dataSource = new MatTableDataSource<Request>(this.RequestData);
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





  deleteRequest(index: number, e){
    if(window.confirm('Are you sure to delete?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.requestsAPI.DeleteRequests(e._id).subscribe()
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
  //       this.ngZone.run(() => this.router.navigateByUrl('/hod/managestaffs'))

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
