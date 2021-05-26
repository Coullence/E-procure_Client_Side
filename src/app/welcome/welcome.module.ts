
 import { NgModule } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { MaterialModule } from '../material-modules';
 
 import { WelcomeRoutingModule } from './welcome-routing.module';
 import { WelcomeComponent } from './welcome.component';
 import { StaffRequestComponent } from './staff-request/staff-request.component';
 import { SupplierRequestComponent } from './supplier-request/supplier-request.component';
 import { WelcomePageComponent } from './welcome-page/welcome-page.component';
 import { EmployeeRequestComponent } from './employee-request/employee-request.component';
 import { UpdateProfileComponent } from './employee-request/Dialogs/update-profile/update-profile.component';
 import { ViewProfileComponent } from './employee-request/Dialogs/view-profile/view-profile.component';
 import { HeaderWidgetComponent } from './Shared/header-widget/header-widget.component';
 import { UpdateAccountDialogComponent } from './Shared/update-account-dialog/update-account-dialog.component';
 import { FooterWidgetComponent } from './Shared/footer-widget/footer-widget.component';
 import { BreadcrumWidgetComponent } from './Shared/breadcrum-widget/breadcrum-widget.component';
import { TendersComponent } from './tenders/tenders.component';
import { BindTenderComponent } from './bind-tender/bind-tender.component';


@NgModule({
  declarations: [WelcomeComponent, StaffRequestComponent, SupplierRequestComponent, WelcomePageComponent, EmployeeRequestComponent, UpdateProfileComponent, ViewProfileComponent, HeaderWidgetComponent, UpdateAccountDialogComponent, FooterWidgetComponent, BreadcrumWidgetComponent, TendersComponent, BindTenderComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MaterialModule

  ],
})
export class WelcomeModule { }

