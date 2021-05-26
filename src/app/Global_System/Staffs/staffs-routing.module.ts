import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffsComponent } from './staffs.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { RequestComponent } from './Pages/request/request.component';
import { Role } from 'src/@core/Models/role';
import { UpdateRequestDialogComponent } from './Pages/request/Dialogs/update-request-dialog/update-request-dialog.component';
import { AuthGuard } from 'src/@core/helpers/auth.guard';


import { RejectedRequestsComponent } from './Pages/rejected-requests/rejected-requests.component';
import { MakeRequestsComponent } from './Pages/make-requests/make-requests.component';
import { SubmitedRequestsComponent } from './Pages/submited-requests/submited-requests.component';
import { ApprovedRequestsComponent } from './Pages/approved-requests/approved-requests.component';
import { UpdateRequestComponent } from './Pages/submited-requests/Dialogs/update-request/update-request.component';

const routes: Routes =  [{
  path: '', 
  component: StaffsComponent,
  children: [
   {
     path: '',
     component: DashboardComponent,
   },
   {
     path: 'request',
     component: RequestComponent,
     canLoad: [AuthGuard],
     data: { roles: [Role.Staff] },
   },
   {
    path: 'request',
    component: RequestComponent,
  },

   {
    path: 'makeRequest',
    component: MakeRequestsComponent,
  },
   {
    path: 'submitedRequest',
    component: SubmitedRequestsComponent,
  },
   {
    path: 'approvedRequest',
    component: ApprovedRequestsComponent,
  },
   {
    path: 'rejectedRequest',
    component: RejectedRequestsComponent,
  },




  {
    path: 'updateRequest/:id',
    component:UpdateRequestComponent,
  },
 
 ],
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffsRoutingModule { }
 