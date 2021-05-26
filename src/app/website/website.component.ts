import { Component, OnInit } from '@angular/core';

import { TenderService } from 'src/@core/Service/TenderService/tenders.service'; 

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {



  categoriesData: any = [];
  tendersData: any = [];

  constructor(
    private requestAPI: TenderService
    ) {

     this.requestAPI.GetOpenTenders().subscribe(data => {
     	this.tendersData = data;
    }); 

    }

  ngOnInit(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');

  }

}
