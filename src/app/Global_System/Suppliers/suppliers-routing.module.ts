import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuppliersComponent } from './suppliers.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { NewOrdersComponent } from './Pages/new-orders/new-orders.component';
import { RejectedOrdersComponent } from './Pages/rejected-orders/rejected-orders.component';
import { ApprovedOrdersComponent } from './Pages/approved-orders/approved-orders.component';

const routes: Routes = [{
  path: '', 
  component: SuppliersComponent,
  children: [
   {
     path: '',
     component: DashboardComponent,
   },
   {
     path: 'orders',
     component: OrdersComponent,
   },
   {
     path: 'newOrders',
     component: NewOrdersComponent,
   },
   {
     path: 'rejectedOrders',
     component: RejectedOrdersComponent,
   },
   {
     path: 'approvedOrders',
     component: ApprovedOrdersComponent,
   },
 
 ],
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
