import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/@core/Models/Order';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from 'src/@core/Service/OrdersService/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  OrderData: any = [];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [ 'orderName','prodCategory','prodSupplier','expectedDate'];
  searchKey: string;

  constructor(private orderApi: OrderService) {
    this.orderApi.GetOrder().subscribe(data => {
      this.OrderData = data;
      this.dataSource = new MatTableDataSource<Order>(this.OrderData);
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