import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './store.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ManageStoreComponent } from './Pages/manage-store/manage-store.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { SuppliersComponent } from './Pages/suppliers/suppliers.component';
import { TendersComponent } from './Pages/tenders/tenders.component';
import { RequestsComponent } from './Pages/requests/requests.component';

const routes: Routes =  [{
  path: '', 
  component: StoreComponent,
  children: [
   {
     path: '',
     component: DashboardComponent,
   },
   {
     path: 'managestore',
     component: ManageStoreComponent,
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
    path: 'tenders',
    component: TendersComponent,
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
export class StoreRoutingModule { }
