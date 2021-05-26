import { Component, OnDestroy, OnInit } from '@angular/core';
// RxJs 6.x+ import paths
import { first,filter, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CountService } from 'src/@core/Service/Count/count.service';
import { ManageStaffsComponent } from './../../Pages/manage-staffs/manage-staffs.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy, OnInit {

  private ngUnsubscribe = new Subject();
  newStaff: Object;
  noStaff: Object;
  dataCount: Object;



  constructor(
    public countService: CountService,
    ) 
  { }

  ngOnInit(): void {

    this.countService.countNewStaff().pipe(first(
    	// takeUntil(),
    	)).subscribe(count => {
        this.dataCount = count;
        if (this.dataCount == 0) {
        	this.noStaff = this.dataCount;
        }else{

        this.newStaff = this.dataCount;

        }
    });
  }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

	
	username = JSON.parse(localStorage.getItem('currentUser')).email;
	role = JSON.parse(localStorage.getItem('currentUser')).role;

}
