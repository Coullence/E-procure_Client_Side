import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/@core/Models/Order';
import { OrderService } from 'src/@core/Service/OrdersService/orders.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-order-dialog',
  templateUrl: './update-order-dialog.component.html',
  styleUrls: ['./update-order-dialog.component.scss']
})
export class UpdateOrderDialogComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selected
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetStudentForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  orderForm: FormGroup;
  
  OrderStatusArray: any = ['Pending...', 'Approved', 'Rejected!'];
// check this
  ngOnInit() {
    this.clearOrderForm();
  }

 

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private orderService: OrderService,
    private dialog: MatDialog
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.orderService.GetOrderId(id).subscribe(data => {
      this.orderForm = this.fb.group({
// check

        orderName: [data.orderName, [Validators.required]],
        prodCategory: [data.prodCategory, [Validators.required]],
        prodQuantity: [data.prodQuantity, [Validators.required]],
        prodSupplier: [data.prodSupplier, [Validators.required]],
        supplierEmail: [data.supplierEmail, [Validators.required]],
        expectedDate: [data.expectedDate, [Validators.required]],

      })  
    })    
  }


  /* Reactive book form */
  clearOrderForm() {
    this.orderForm = this.fb.group({
      orderName: ['', [Validators.required]],
      prodCategory: ['', [Validators.required]],
      prodQuantity: ['', [Validators.required]],
      supplierEmail: ['', [Validators.required]],
      expectedDate: ['', [Validators.required]],
    })
  }





  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.orderForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.orderForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateOrderForm() {
    console.log(this.orderForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.orderService.UpdateOrder(id, this.orderForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/hod/manageorders'))
        
      });
    }
  }
  closeUpdate(){
    this.ngZone.run(() => this.router.navigateByUrl('/hod/manageorders'))
  }
  
}
