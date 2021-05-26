import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { RequestsService } from 'src/@core/Service/RequestsService/requests.service';
import { NgForm, FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  requestsForm: FormGroup;
  
  RequestCategoryArray: any = ['Electricity Assets','Cleaning Essentials','IT & ICT Equipments','Office/Stationery Assets','Kitchen Essentials','Washroom Essentials','Office Room Essentials','Telphone Assets'];
  JobGroupArray: any = ['Job-Group A', 'Job-Group B', 'Job-Group C', 'Job-Group D', 'Job-Group E'];
  
  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private requestsApi: RequestsService,
    private dialog: MatDialog
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.requestsForm = this.fb.group({

      reqName: ['', [Validators.required]],
      prodCategory: ['', [Validators.required]],
      prodQuantity: ['', [Validators.required]],
      //Staff Details
      staffName: ['', [Validators.required]],
      staffEmail: ['', [Validators.email]],
      staffPhone: ['', [Validators.required]],
      jobGroup: ['', [Validators.required]],
      staffRole: ['staff'],
      reqDate:Date.now(),
      //Request Status
      reqStatus: ['Received'],
     


    })
  }

 
  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.requestsForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.requestsForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitRequestsForm() {
    if (this.requestsForm.valid) {
      this.requestsApi.AddRequests(this.requestsForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/staffs'))
      });
    }
  }


}