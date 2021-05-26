import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  [x: string]: any;

  private _createUrl = "http://localhost:3000/create/regTenderReq"
  
  private _updateUrl = "http://localhost:3000/update/udateTenderReq:id"

  private _deleteUrl = "http://localhost:3000/delete/deleteTenderReq:id"

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    vendorCompany: new FormControl('', Validators.required),
    vendorEmail: new FormControl('', Validators.email),
    vendorPhone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    vendorQuotation: new FormControl('', Validators.required ),
    tenderCategory: new FormControl(0),
    batchNo: new FormControl('', Validators.required),
    




  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      vendorCompany: '',
      vendorEmail: '',
      vendorPhone:'',
      VendorQuotation:'',
      tenderCategory: '',
      batchN0: '',
    });
  }

  createRequest(data) {
    return this.http.post<any>(this._createUrl, data);

  }
  deleteRequest(data) {
    return this.http.delete<any>(this._deleteUrl, data);

  }
}
