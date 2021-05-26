import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/@core/Service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-widget',
  templateUrl: './header-widget.component.html',
  styleUrls: ['./header-widget.component.scss']
})
export class HeaderWidgetComponent implements OnInit {

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
