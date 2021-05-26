import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from 'src/@core/Service/EmployeesService/employees.service';
import { Employee } from 'src/@core/Models/Employee';
import { Order } from 'src/@core/Models/Order';
import { OrderService } from 'src/@core/Service/OrdersService/orders.service';
import { StaffService } from 'src/@core/Service/StaffsService/staffs.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffsComponent implements OnInit {
  StaffData: any = [];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [ 
    'Status',
    'fullName',
    'jobId',
    'createdAt',
  ];
  searchKey: string;

  constructor(private staffApi: StaffService) {
    this.staffApi.GetStaffs().subscribe(data => {
      this.StaffData = data;
      this.dataSource = new MatTableDataSource<Order>(this.StaffData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }


  
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


}
