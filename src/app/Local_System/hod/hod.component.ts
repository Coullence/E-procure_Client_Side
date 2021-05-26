import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-hod',
  templateUrl: './hod.component.html',
  styleUrls: ['./hod.component.scss']
})
export class hodComponent implements OnInit, OnDestroy {
  showLoadingIndicator = true;
  constructor(
    private router: Router,
    ) { 
      this.router.events.subscribe((routerEvent: Event) => {
        if (routerEvent instanceof NavigationStart) {
          this.showLoadingIndicator = true;
        }
        if (routerEvent instanceof NavigationEnd) {
          this.showLoadingIndicator = false;
        }
      }); }
    

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
