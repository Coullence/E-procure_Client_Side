import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { User } from 'src/@core/Models/user';
import { AuthenticationService } from 'src/@core/Service/authentication.service';
import { Role } from 'src/@core/Models/role';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements  OnInit, OnDestroy {

  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  subscription: Subscription;
  ngOnInit(): void {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(() => window.scrollTo(0, 0));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  get ishod() {
      return this.currentUser && this.currentUser.role === Role.hod;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/Auth/login']);
  }
}