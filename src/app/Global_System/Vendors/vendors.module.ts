import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsComponent } from './vendors.component';
import { SidenavComponent } from './Layouts/Sidenav/sidenav.component';
import { HeaderComponent } from './Layouts/Header/header.component';
import { FooterComponent } from './Layouts/Footer/footer.component';
import { MaterialModule } from 'src/app/material-modules';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { TendersComponent } from './Pages/tenders/tenders.component';
import { BindingsComponent } from './Pages/tenders/widgets/bindings/bindings.component';
import { TenderRequestComponent } from './Pages/tender-request/tender-request.component';
import { SubmitedTenderRequestComponent } from './Pages/submited-tender-request/submited-tender-request.component';


@NgModule({
  declarations: [
    VendorsComponent,
    FooterComponent, 
    HeaderComponent, 
    SidenavComponent, DashboardComponent, TendersComponent, BindingsComponent, TenderRequestComponent, SubmitedTenderRequestComponent,
  ],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    MaterialModule
  ]
})
export class VendorsModule { }
