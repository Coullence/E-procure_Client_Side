import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { RequestsService } from 'src/@core/Service/RequestsService/requests.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-request-dialog',
  templateUrl: './update-request-dialog.component.html',
  styleUrls: ['./update-request-dialog.component.scss']
})
export class UpdateRequestDialogComponent implements OnInit  {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selected
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetRequestsForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  requestsForm: FormGroup;
  
 
  RequestCategoryArray: any = ['Electricity Assets','Cleaning Essentials','IT & ICT Equipments','Office/Stationery Assets','Kitchen Essentials','Washroom Essentials','Office Room Essentials','Telphone Assets'];
  JobGroupArray: any = ['Job-Group A', 'Job-Group B', 'Job-Group C', 'Job-Group D', 'Job-Group E'];
  
  ngOnInit() {
    this.updateBookForm();
  }

 

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private requestsApi: RequestsService,
    private dialog: MatDialog
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.requestsApi.GetRequestsId(id).subscribe(data => {
      
      this.requestsForm = this.fb.group({


        reqName: [data.reqName, [Validators.required]],
        prodCategory: [data.prodCategory, [Validators.required]],
        prodQuantity: [data.prodQuantity, [Validators.required]],
        //Staff Details
        staffName: [data.staffName, [Validators.required]],
        staffEmail: [data.staffEmail, [Validators.email]],
        staffPhone: [data.staffPhone, [Validators.required]],
        jobGroup: [data.jobGroup, [Validators.required]],
        staffRole: ['staff'],
        reqDate:Date.now(),
        //Request Status
        reqStatus: ['Received'],
       



      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.requestsForm= this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      jobGroup: ['', [Validators.required]],
      role: ['', [Validators.required]],
      jobStatus: ['', [Validators.required]],
      regDate: Date.now(),
      password: ['', [Validators.required]],
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

  /* Update book */
  updateRequestsForm() {
    console.log(this.requestsForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.requestsApi.UpdateRequests(id, this.requestsForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/staffs/request'))
        
      });
    }
  }
  closeUpdate(){
    this.ngZone.run(() => this.router.navigateByUrl('/staffs/request'))
  }
  
}
