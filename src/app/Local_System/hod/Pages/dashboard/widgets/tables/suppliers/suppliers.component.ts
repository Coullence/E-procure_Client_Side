import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Supplier } from 'src/@core/Models/Supplier';
import { MatPaginator } from '@angular/material/paginator';
import { SupplierService } from 'src/@core/Service/SuppliersService/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit{
  SupplierData: any = [];
  dataSource: MatTableDataSource<Supplier>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [

    'Status',
    'fullName',
    'jobGroup',
    'createdAt'

];
  searchKey: string;

  constructor(private supplierApi: SupplierService) {
    this.supplierApi.GetSuppliers().subscribe(data => {
      this.SupplierData= data;
      this.dataSource = new MatTableDataSource<Supplier>(this.SupplierData);
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