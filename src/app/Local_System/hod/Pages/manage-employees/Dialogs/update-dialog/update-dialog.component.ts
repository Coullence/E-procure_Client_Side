import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { EmployeeService } from 'src/@core/Service/EmployeesService/employees.service';
import { AuthService } from 'src/@core/Service/AuthService/auth.service';
import { NgForm, FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router, ActivatedRoute } from '@angular/router';
import { RejectRequestDialogComponent } from './../reject-request-dialog/reject-request-dialog.component';


@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  requestsForm: FormGroup;
  JobStatusArray: any = ['Available','Field Work','On Leave','Compulsory Leave'];
  
    public userId="";
    public employeeId = "";
    public employeeName =  "";
    public employeeEmail = "";
    public employeePhone = "";
    public employeeAltPhone = "";
    public jobId = "";
    public KRA_Pin = "";
    public jobGroup = "";
    public National_Id = "";
    public requestAs = "";
    public Status = "";
    public updateOn = "";
    public requestOn="";



  EmployeeRoleArray: any = ['Requests Manager','Store Manager','Purchases Manager','Tender Manager','Invoice Manager'];
  JobGroupArray: any     = ['Job Group A','Job Group B','Job Group C','Job Group D','Job Group E','Job Group F'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private employeeAPI: EmployeeService,
    private authAPI: AuthService,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }
    ngOnInit() {

    var id = this.actRoute.snapshot.paramMap.get('id');

    this.employeeAPI.GetEmployeeId(id).subscribe(data => {
    this.employeeId = data._id;
    this.employeeName =  data.employeeName;
    this.employeeEmail = data.employeeEmail;
    this.employeePhone = data.employeePhone;
    this.employeeAltPhone = data.employeeAltPhone;
    this.jobId = data.jobId;
    this.KRA_Pin = data.KRA_Pin;
    this.jobGroup = data.jobGroup;
    this.National_Id = data.National_Id;
    this.requestAs = data.requestAs;
    this.Status = data.Status;
    this.requestOn = data.createdAt;
    this.updateOn = data.updatedAt;

    
  this.requestsForm = this.fb.group({
        role: [this.requestAs],
      })
           
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
      this.employeeAPI.AddEmployee(this.requestsForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/welcome'))
      });
    }
  }

    /* Update book */
  updateUser() {
    var userId = this.actRoute.snapshot.paramMap.get('id')
    this.employeeAPI.GetEmployeeId(userId).subscribe(data => {
    // var id = data.employeeForeignId;
    var id = "5f50ba3c27a9da0b5684e67b";
    if (window.confirm('Are you sure you want to update?')) {
      console.log("id front", id);
      this.employeeAPI.updateUser(id, this.requestsForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/hod/manageemployees'))
        
      });
    }
  })

  }



    rejectRequest(){
    this.dialog.open(RejectRequestDialogComponent, {
      width: '600px',

    });

  }





}