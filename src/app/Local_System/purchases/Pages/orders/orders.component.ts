import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
  }
 

  addButtonClick(){
  }
  //edit
  firstButtonClicked($event){
  }
  //view
  secondButtonClicked($event){
    
  }
//delete
  thirdActionButtonClicked($event){
    
  }
  
}
