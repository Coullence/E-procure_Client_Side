
// RxJs 6.x+ import paths
import { first, filter, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Component, OnDestroy, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Order } from 'src/@core/Models/Order';
import { OrderService } from 'src/@core/Service/OrdersService/orders.service';
import { StoreService } from 'src/@core/Service/StoreService/store.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { CountService } from 'src/@core/Service/Count/count.service';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';



@Component({
  selector: 'app-update-category-dialog',
  templateUrl: './update-category-dialog.component.html',
  styleUrls: ['./update-category-dialog.component.scss']
})
export class UpdateCategoryDialogComponent implements OnDestroy, OnInit {

  private ngUnsubscribe = new Subject();  
  newStaff: Object;
  noStaff: Object;
  dataCount: Object;
  public Status = "";
  public cssClass = "";
  public statusBadgeEnough = "";
  public statusBadgeMedium = "";
  public statusBadgeLow = "";
  public categoryName="";
  public error = "";

  loading = false;

  myForm: FormGroup;
  categories: any = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    public countService: CountService,
    private exportAsService: ExportAsService,
    private dialog: MatDialog,
    private requestAPI: StoreService
  ) {

  	var id = this.actRoute.snapshot.paramMap.get('id');
    this.requestAPI.GetCategoryId(id).subscribe(data => {  
      this.categoryName= data.categoryName;

      this.myForm = this.fb.group({
        categoryName: [this.categoryName],
      })
      

    })



  
    this.requestAPI.GetCategories().subscribe(data => {
    this.loading = false;
      this.categories = data;
    })

    }

  ngOnInit(): void {




    this.countService.countNewStaff().pipe(first(
      // takeUntil(),
    )).subscribe(count => {
      this.dataCount = count;
      if (this.dataCount == 0) {
        this.noStaff = this.dataCount;
      } else {

        this.newStaff = this.dataCount;

      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



  /* Submit book */
  updateNewStaffCount() {
  
  }



    /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }  



    submitRequestsForm() {
    this.loading = true;
      var id = this.actRoute.snapshot.paramMap.get('_id')
      if (window.confirm('Are you sure you want to update?')) {
         this.requestAPI.updateCategory(id, this.myForm.value).pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.ngZone.run(() => this.router.navigateByUrl('/Admin/manage_categories'))
          },
          error => {
            this.loading = false;
            this.error = error;
          });
      }
  }





}
