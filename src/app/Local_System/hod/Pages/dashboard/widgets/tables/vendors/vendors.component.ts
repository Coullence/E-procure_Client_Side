import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TenderReq } from 'src/@core/Models/TenderReq';
import { MatPaginator } from '@angular/material/paginator';
import { TenderReqService } from 'src/@core/Service/TenderReqService/tender-req.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  TenderReqData: any = [];
  dataSource: MatTableDataSource<TenderReq>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [ 'vendorCompany','vendorQuotation','tenderCategory','progress'];
  searchKey: any;

  constructor(private tenderReqApi: TenderReqService) {
    this.tenderReqApi.GetTenderReq().subscribe(data => {
      this.TenderReqData = data;
      this.dataSource = new MatTableDataSource<TenderReq>(this.TenderReqData);
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