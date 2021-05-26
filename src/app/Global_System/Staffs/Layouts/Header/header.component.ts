import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/@core/Service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    return this.router.navigate(['/']);
}

}
