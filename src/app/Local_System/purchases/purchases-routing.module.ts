import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchasesComponent } from './purchases.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { SuppliersComponent } from './Pages/suppliers/suppliers.component';
import { StockComponent } from './Pages/stock/stock.component';
import { OrdersComponent } from './Pages/orders/orders.component';

const routes: Routes =  [{
  path: '', 
  component: PurchasesComponent,
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
    path: 'orders',
    component: OrdersComponent,
  },
   {
    path: 'suppliers',
    component: SuppliersComponent,
  },
  {
    path: 'stock',
    component: StockComponent,
  },
  
 ],
 }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
