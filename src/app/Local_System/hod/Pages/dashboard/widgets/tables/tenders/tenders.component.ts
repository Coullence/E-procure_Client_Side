import { Component, OnInit, ViewChild } from '@angular/core';
import { FlxUiDataTable } from 'flx-ui-datatable';
import { MatTableDataSource } from '@angular/material/table';
import { Tender } from 'src/@core/Models/Tender';
import { MatPaginator } from '@angular/material/paginator';
import { TenderService } from 'src/@core/Service/TenderService/tenders.service';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.scss']
})
export class TendersComponent implements OnInit {
  TenderData: any = [];
  dataSource: MatTableDataSource<Tender>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['itemName','itemQuantity','tenderStatus','createdAt'];
  searchKey: any;

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


  
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


}