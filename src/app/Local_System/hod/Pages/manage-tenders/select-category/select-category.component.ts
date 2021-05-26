import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';


import { StoreService } from 'src/@core/Service/StoreService/store.service';
import { AddCategoryDialogComponent } from '../../manage-store/Dialogs/add-category-dialog/add-category-dialog.component';


@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  loading = false;
  error = '';

  categories: any = [];


  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  myForm: FormGroup;
  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private requestsAPI: StoreService,
    private dialog: MatDialog
  ) {

    this.requestsAPI.GetCategories().subscribe(data => {
    this.loading = false;
      this.categories = data;
  
    })

   }

       addCategory(){
    this.dialog.open(AddCategoryDialogComponent, {
      width: '600px',

    });

  }



  /* Reactive book form */
  submitBookForm() {
    this.myForm= this.fb.group({

      categoryName:   ['', [Validators.required]],
      Status:         ['New'],


    })
  }
    initializeForm() {
    this.myForm= this.fb.group({

      categoryName:   ['', [Validators.required]],
      Status:         ['New'],


    })
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

  /* Submit book */
  submitRequestsForm() {
    if (this.myForm.valid) {

      this.loading = true;
      this.requestsAPI.createCategory(this.myForm.value).subscribe(
                data => {
                  console.log(data);
                  this.ngZone.run(() => this.router.navigateByUrl('/Admin/manage_categories'))
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    
                })
    }
  }


}