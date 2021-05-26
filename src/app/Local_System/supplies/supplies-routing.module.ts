import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuppliesComponent } from './supplies.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { RequestsComponent } from './Pages/requests/requests.component';
import { StoreComponent } from './Pages/store/store.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { ManagesuppliesComponent } from './Pages/managesupplies/managesupplies.component';
import { ManagesuppliersComponent } from './Pages/managesuppliers/managesuppliers.component';

const routes: Routes =  [{
  path: '', 
  component: SuppliesComponent,
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
    path: 'managesuppliers',
    component: ManagesuppliersComponent,
  },
  {
    path: 'managesupplies',
    component: ManagesuppliesComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'store',
    component: StoreComponent,
  },
  {
    path: 'requests',
    component: RequestsComponent,
  },

  
 ],
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesRoutingModule { }
