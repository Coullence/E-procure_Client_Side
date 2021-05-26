import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { ApiService } from 'src/@core/Service/test/test.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { EmployeeService } from 'src/@core/Service/EmployeesService/employees.service';
import { MatDialog } from '@angular/material/dialog';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-reg-dialog',
  templateUrl: './reg-dialog.component.html',
  styleUrls: ['./reg-dialog.component.scss']
})
export class RegDialogComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  studentForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

  
  JobGroupArray: any = ['Job-Group A', 'Job-Group B', 'Job-Group C', 'Job-Group D', 'Job-Group E'];
  
  JobStatusArray: any = ['Available', 'Official Leave', 'Compulsory Leave', 'Field work'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private studentApi: EmployeeService,
    private dialog: MatDialog
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.studentForm = this.fb.group({
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

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }  

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitStudentForm() {
    if (this.studentForm.valid) {
      this.studentApi.AddEmployee(this.studentForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/hod/manageemployees'))
      });
    }
  }

  closeDialog(){
    this.dialog.closeAll();
  }

}