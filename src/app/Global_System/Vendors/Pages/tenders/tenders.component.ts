import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/@core/Service/VendorService/vendor.service';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.scss']
})
export class TendersComponent implements OnInit {

  constructor( public vendorService: VendorService) { }


  prodCategories = [
    { id: 1, value: 'IT & ICT Equipments' },
    { id: 2, value: 'Office & general Stationery' },
    { id: 3, value: 'Office Desks, seats & cabinets' },
    { id: 4, value: 'Windows panes, curtains and carbets' },
    { id: 5, value: 'Network systems management' },
    { id: 6, value: 'Telephone systems' },
    { id: 5, value: 'Washroom essentials' },

  
  ];

  

  ngOnInit() {
  }
  onSubmit() {
    if (this.vendorService.form.valid) {
      
      this.vendorService.createRequest(this.vendorService.form.value)
      .subscribe( 
        res=>console.log(res),
      err=>console.log(err)
      )
      //this.service.insertEmployee(this.service.form.value);
      //this.service.form.reset();
      //this.service.initializeFormGroup();
      //console.log(this.service.form.value);
      
      //this.notificationService.success(':: Submitted successfully');
    }
  }

  onClear() {
    this.vendorService.form.reset();
    this.vendorService.initializeFormGroup();
  }
    //edit
    firstButtonClicked(e:any){
      console.log('Edit clicked!', e);
    }
    //view
    secondButtonClicked($event){
      
    }
  //delete 
    thirdActionButtonClicked(e:any){
      this.vendorService.deleteRequest(this.vendorService.e._id)
      .subscribe( 
        res=>console.log(res),
      err=>console.log(err)
      )
      
    }

}
