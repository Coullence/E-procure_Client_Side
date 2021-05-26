import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/@core/Service/authentication.service';
import { Router } from '@angular/router';

import { TenderService } from 'src/@core/Service/TenderService/tenders.service'; 
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  tendersData: {};

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private requestAPI: TenderService
    ) {

     this.requestAPI.GetOpenTenders().subscribe(data => {
      this.tendersData = data;
   }); 
     }

  ngOnInit(): void {
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/Auth/login']);
}

}
