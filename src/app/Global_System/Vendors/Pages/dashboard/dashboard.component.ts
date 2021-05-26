import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Tender } from 'src/@core/Models/Tender';
import { MatPaginator } from '@angular/material/paginator';
import { TenderService } from 'src/@core/Service/TenderService/tenders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  TenderData: any = [];
  dataSource: MatTableDataSource<Tender>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['batchNO','tenderCategory','resourceQuantity','resourceCondition','tenderStatus','postDate','expiryDate', 'action'];
  searchKey: string;

  constructor(private tenderApi: TenderService) {
    this.tenderApi.GetTenders().subscribe(data => {
      this.TenderData = data;
      this.dataSource = new MatTableDataSource<Tender>(this.TenderData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteTenders(index: number, e){

  }
  
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


}