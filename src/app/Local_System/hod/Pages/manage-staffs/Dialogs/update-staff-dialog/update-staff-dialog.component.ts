import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { StaffService } from 'src/@core/Service/StaffsService/staffs.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-update-staff-dialog',
  templateUrl: './update-staff-dialog.component.html',
  styleUrls: ['./update-staff-dialog.component.scss']
})
export class UpdateStaffDialogComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  reqStatus
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  requestsForm: FormGroup;

  RequestsStatusArray: any = [ 'Default','Received', 'Processing...', 'Rejected!', 'Staff','Revoked!'];
  public userId="";
  ngOnInit() {
    this.updateBookForm();
  }



  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private staffAPI: StaffService,
    private dialog: MatDialog
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.staffAPI.GetStaffId(id).subscribe(data => {
      this.userId = data.userForeignId;
      console.log(this.userId )
      this.requestsForm = this.fb.group({
        role: [data.role, [Validators.required]],
        approvalDate: Date.now(),

      })
    })
  }
  //  UpdateStaffRole

  /* Reactive book form */
  updateBookForm() {
    this.requestsForm = this.fb.group({
  
      role: ['', [Validators.required]],
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


    var id = this.userId 
    if (window.confirm('Are you sure you want to update?')) {
      this.staffAPI. UpdateStaffRole(id, this.requestsForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/Admin/managestaffs'))

      });
    }
  }
  closeUpdate() {
    this.ngZone.run(() => this.router.navigateByUrl('/Admin/managevendors'))
  }

}
