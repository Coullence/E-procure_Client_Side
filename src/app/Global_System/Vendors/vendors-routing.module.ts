import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorsComponent } from './vendors.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { TendersComponent } from './Pages/tenders/tenders.component';
import { TenderRequestComponent } from './Pages/tender-request/tender-request.component';

const routes: Routes = [{
  path: '', 
  component: VendorsComponent,
  children: [
   {
     path: '',
     component: DashboardComponent,
   },
   {
     path: 'BindTender',
     component: TendersComponent,
   },

   
   {
    path: 'BindTender/:id',
    component: TendersComponent, 
  }, 
  {
    path: 'tender/request',
    component: TenderRequestComponent, 
  },
 
 ],
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorsRoutingModule { }
