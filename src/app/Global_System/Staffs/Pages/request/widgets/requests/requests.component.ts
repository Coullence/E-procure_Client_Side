import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RequestsService } from 'src/@core/Service/RequestsService/requests.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  RequestsData: any = [];
  dataSource: MatTableDataSource<Request>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [ 'reqName','prodCategory','prodQuantity','staffName','staffEmail','staffPhone','jobGroup','reqDate','reqStatus', 'action'];
  searchKey: string;

  constructor(
    private requestsApi: RequestsService,
    private dialog: MatDialog,
    ) {
    this.requestsApi.GetRequests().subscribe(data => {
      this.RequestsData = data;
      this.dataSource = new MatTableDataSource<Request>(this.RequestsData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }



  deleteRequests(index: number, e){
    if(window.confirm('Are you sure to delete?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.requestsApi.DeleteRequests(e._id).subscribe()
    }
  }
  
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


}