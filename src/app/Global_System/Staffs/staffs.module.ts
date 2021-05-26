import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffsRoutingModule } from './staffs-routing.module';
import { StaffsComponent } from './staffs.component';
import { FooterComponent } from './Layouts/Footer/footer.component';
import { SidenavComponent } from './Layouts/Sidenav/sidenav.component';
import { HeaderComponent } from './Layouts/Header/header.component';
import { MaterialModule } from 'src/app/material-modules';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { RequestComponent } from './Pages/request/request.component';
import { RequestsComponent } from './Pages/request/widgets/requests/requests.component';
import { UpdateRequestDialogComponent } from './Pages/request/Dialogs/update-request-dialog/update-request-dialog.component';
import { RejectedRequestsComponent } from './Pages/rejected-requests/rejected-requests.component';
import { MakeRequestsComponent } from './Pages/make-requests/make-requests.component';
import { SubmitedRequestsComponent } from './Pages/submited-requests/submited-requests.component';
import { ApprovedRequestsComponent } from './Pages/approved-requests/approved-requests.component';
import { ProfileComponent } from './Pages/dashboard/tables/profile/profile.component';
import { UpdateRequestComponent } from './Pages/submited-requests/Dialogs/update-request/update-request.component';


@NgModule({
  declarations: [
    StaffsComponent,
    FooterComponent, 
    HeaderComponent, 
    SidenavComponent, DashboardComponent, RequestComponent, RequestsComponent, UpdateRequestDialogComponent, RejectedRequestsComponent, MakeRequestsComponent, SubmitedRequestsComponent, ApprovedRequestsComponent, ProfileComponent, UpdateRequestComponent
  ],
  imports: [
    CommonModule,
    StaffsRoutingModule,
    MaterialModule
  ]
})
export class StaffsModule { }
