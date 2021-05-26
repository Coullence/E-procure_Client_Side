import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/@core/Models/Order';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from 'src/@core/Service/OrdersService/orders.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {
  OrderData: any = [];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [ 'orderName','prodCategory','prodQuantity','prodSupplier','supplierEmail','expectedDate','createdAt','updatedAt' , 'action'];
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

  deleteOrder(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.orderApi.DeleteOrder(e._id).subscribe()
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