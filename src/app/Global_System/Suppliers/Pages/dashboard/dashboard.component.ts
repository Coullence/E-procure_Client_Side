import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InvoiceService } from 'src/@core/Service/InvoiceService/invoice.service';
import { Invoice } from 'src/@core/Models/Invoice';
import { MatDialog } from '@angular/material/dialog';

import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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

InvoiceData: any = [];
dataSource: MatTableDataSource<Invoice>;
@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;



displayedColumns: string[] = [
  
'itemCategory',
'item',
'itemQuantity',
'itemUnitPrice',
'Total',
'dateExpected',
'Status',
 'action'
];
searchKey: string;
  id: any;



constructor(
  private invoiceAPI: InvoiceService,
  private exportAsService: ExportAsService,
  private dialog: MatDialog,
  ) {

    this.id = JSON.parse(localStorage.getItem('currentUser')).id;

  this.invoiceAPI.GetInvoiceBySupplier(this.id).subscribe(data => {
    this.InvoiceData = data;
    this.dataSource = new MatTableDataSource<Invoice>(this.InvoiceData);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  })    


}

ngOnInit() { }

deleteEmployee(index: number, e){
  if(window.confirm('Are you sure to delete?')) {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.invoiceAPI.deleteInvoice(e._id).subscribe()
  }
}

onSearchClear() {
  this.searchKey = "";
  this.applyFilter();
}

applyFilter() {
  this.dataSource.filter = this.searchKey.trim().toLowerCase();
}


///Reports generator
  exportAsString(type: SupportedExtensions, opt?: string) {
  this.loading = true;
  this.config.elementIdOrContent = '<div> test string </div>';
  this.exportAs(type, opt);
  setTimeout(() => {
    this.config.elementIdOrContent = 'myData';
  }, 1000);
}

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