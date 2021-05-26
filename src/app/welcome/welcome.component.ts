import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  showLoadingIndicator = true;
  constructor(
    private router: Router,
    ) {  }

  subscription: Subscription;
  ngOnInit(){
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(() => window.scrollTo(0, 0));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
}
