import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { RequestsService } from 'src/@core/Service/RequestsService/requests.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-request-dialog',
  templateUrl: './update-request-dialog.component.html',
  styleUrls: ['./update-request-dialog.component.scss']
})
export class UpdateRequestDialogComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  reqStatus
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  requestsForm: FormGroup;

  RequestsStatusArray: any = ['Received', 'Processing...', 'Rejected', 'On Deleivery'];

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

        reqStatus: [data.reqStatus, [Validators.required]],
        approvalDate: Date.now(),



      })
    })
  }

  /* Reactive book form */
  updateBookForm() {
    this.requestsForm = this.fb.group({
  
      reqStatus: ['', [Validators.required]],
      approvalDate: Date.now(),
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
      this.requestsApi.UpdateRequests(id, this.requestsForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/Admin/managerequests'))

      });
    }
  }
  closeUpdate() {
    this.ngZone.run(() => this.router.navigateByUrl('/Admin/managerequests'))
  }

}
