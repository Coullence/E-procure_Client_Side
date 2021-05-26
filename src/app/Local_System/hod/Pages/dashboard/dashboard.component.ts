import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from './dialogs/add-employee/add-employee.component';
import { CountService } from 'src/@core/Service/Count/count.service';
import { first } from 'rxjs/operators';


import { EmployeeService } from 'src/@core/Service/EmployeesService/employees.service';
import { InvoiceService } from 'src/@core/Service/InvoiceService/invoice.service';
import { RequestsService } from 'src/@core/Service/RequestsService/requests.service';
import { TenderService } from 'src/@core/Service/TenderService/tenders.service';
import { AuthService } from 'src/@core/Service/AuthService/auth.service';
import { StoreService } from 'src/@core/Service/StoreService/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employeesCount: Object;
  staffCount: Object;
  suppliersCount: Object;
  itemsCount: {};
  newItemsCount: {};
  openTendersCount: {};
  closedTendersCount: Object;
  requestCount: {};

  constructor(
    public dialog: MatDialog,
    public storeService: StoreService,
    private tendersAPI: TenderService,
    private requestsService: RequestsService,
    private countService: CountService,
    private authService: AuthService
    ) { }

  openDialog(){
    let dialogRef = this.dialog.open(AddEmployeeComponent);

    dialogRef.afterClosed().subscribe(result => {
    })
  }
  ngOnInit(): void {
    this.storeService.CountNewItems().pipe(first()).subscribe(count => {
        this.newItemsCount = count;
    });
    this.tendersAPI.CountOpenTenders().pipe(first()).subscribe(count => {
      this.openTendersCount = count;
  });
  this.tendersAPI.CountClosedTenders().pipe(first()).subscribe(count => {
    this.closedTendersCount = count;
  });
  this.requestsService.countRequests().pipe(first()).subscribe(count => {
    this.requestCount = count;
  }); 
  this.authService.countStaff().pipe(first()).subscribe(count => {
    this.staffCount = count;
});



    this.countService.employeeCount().pipe(first()).subscribe(count => {
      this.employeesCount = count;
  });
    this.countService.staffCount().pipe(first()).subscribe(count => {
        this.staffCount = count;
    });
    this.countService.suppliersCount().pipe(first()).subscribe(count => {
        this.suppliersCount = count;
    });


  }
  

}
