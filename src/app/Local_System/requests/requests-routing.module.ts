import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestsComponent } from './requests.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { StaffComponent } from './Pages/staff/staff.component';
import { StockComponent } from './Pages/stock/stock.component';
import { OrdersComponent } from './Pages/orders/orders.component';

const routes: Routes =  [{
  path: '', 
  component: RequestsComponent,
  children: [
   {
     path: '',
     component: DashboardComponent,
   },
   {
     path: 'dashboard',
     component: DashboardComponent,
   },
   {
    path: 'requests',
    component: DashboardComponent,
  },
  {
    path: 'staff',
    component: StaffComponent,
  },
  {
    path: 'stock',
    component: StockComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  
 ],
 }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
