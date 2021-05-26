import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { RequestsService } from 'src/@core/Service/RequestsService/requests.service';
import { NgForm, FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

import { AuthService  } from 'src/@core/Service/AuthService/auth.service';
import { EmployeeService } from 'src/@core/Service/EmployeesService/employees.service';
import { first } from 'rxjs/internal/operators/first';



@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {
  public userId="";
  public firstName="";
  public lastName = "";
  public title = "";
  public email ="";
  public createdAt="";
  public updatedAt="";
  public userData= "";
  public updateOn=""; 

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  loading = false;
  error = '';


  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  myForm: FormGroup;
  ngOnInit() {
    this.submitBookForm(); 
    this.userId= JSON.parse(localStorage.getItem('currentUser')).id;
	  this.firstName =  JSON.parse(localStorage.getItem('currentUser')).firstName;
	  this.lastName =  JSON.parse(localStorage.getItem('currentUser')).lastName;
	  this.title = JSON.parse(localStorage.getItem('currentUser')).title;
	  this.email = JSON.parse(localStorage.getItem('currentUser')).email;
	  this.createdAt = JSON.parse(localStorage.getItem('currentUser')).createdAt;
	  this.updatedAt = JSON.parse(localStorage.getItem('currentUser')).updatedAt;

      this.myForm = this.fb.group({

      firstName:    [this.firstName],
      lastName:     [this.lastName],
      title:        [this.title],
      email:        [this.email],
      password:     ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],



      })      
  
  }
  // 

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private employeeAPI: EmployeeService,
    private authAPI: AuthService,
    private dialog: MatDialog
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.myForm= this.fb.group({

      firstName:    ['', [Validators.required]],
      lastName:     ['', [Validators.required]],
      title:        ['', [Validators.required]],
      email:        ['', [Validators.required]],
      prevPassword:        ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      password:     ['', [Validators.required]],


    })
  }

  logout() {
    this.authAPI.logout();
    this.router.navigate(['/Auth/login']);
}

 
  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }  



    /* Update book */
  updateRequestsForm() {
    this.loading = true;
    var id = JSON.parse(localStorage.getItem('currentUser')).id;
    if (window.confirm('Are you sure you want to update?')) {
      console.log("id front side", id);
      this.authAPI.updateUser(id, this.myForm.value).pipe(first())
      .subscribe(
          data => {
            this.loading = false;
            this.logout();
          },
          error => {
              this.error = error;
              this.loading = false;
          });
    }
  }

  closeUpdate(){
    this.router.navigateByUrl('/welcome/RequestasEmployee');
  }


}