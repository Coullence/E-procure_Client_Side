
import { first,filter, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Student } from 'src/@core/Models/student';
import { ApiService } from 'src/@core/Service/test/test.service';
import { Employee } from 'src/@core/Models/Employee';
import { EmployeeService } from 'src/@core/Service/EmployeesService/employees.service';
import { MatDialog } from '@angular/material/dialog';
import { RegDialogComponent } from './../Dialogs/reg-dialog/reg-dialog.component';
import { UpdateDialogComponent } from './../Dialogs/update-dialog/update-dialog.component';
import { CountService } from 'src/@core/Service/Count/count.service';

import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';

@Component({
  selector: 'app-new-employees',
  templateUrl: './new-employees.component.html',
  styleUrls: ['./new-employees.component.scss']
})
export class NewEmployeesComponent implements OnInit {

    loading = false;
    private ngUnsubscribe = new Subject();
    newStaff: Object;
    noStaff: Object;
    dataCount: Object;



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

  EmployeeData: any = [];
  public spanClass = "";
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [ 'Status','employeeName','employeeEmail','employeePhone','jobId','KRA_Pin','requestAs','createdAt','action'];
  searchKey: string;



  constructor(
    private employeeApi: EmployeeService,
    public countService: CountService,
    private exportAsService: ExportAsService,
    private dialog: MatDialog,
    ) {
    this.employeeApi.GetNewEmployee().subscribe(data => {
      //How to filter data on fronted
      this.EmployeeData = data;
      this.dataSource = new MatTableDataSource<Employee>(this.EmployeeData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() {
    this.countNew();

   }

  countNew(){
        this.countService.countNewEmployee().pipe(first(
      // takeUntil(),
      )).subscribe(count => {
        this.dataCount = count;
    });
  }

  addEmployee(){
    this.dialog.open(RegDialogComponent, {
      width: '800px',

    });

  }
  updateEmployee(index: number, i){
    this.dialog.open(UpdateDialogComponent,  {
      width: '900px',
    })
  }

  deleteEmployee(index: number, e){
    if(window.confirm('Are you sure to delete?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.employeeApi.DeleteEmployee(e._id).subscribe()
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