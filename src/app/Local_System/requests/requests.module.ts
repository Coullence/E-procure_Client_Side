import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { FooterComponent } from './Layouts/Footer/footer.component';
import { SidenavComponent } from './Layouts/Sidenav/sidenav.component';
import { HeaderComponent } from './Layouts/Header/header.component';
import { MaterialModule } from 'src/app/material-modules';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { StaffComponent } from './Pages/staff/staff.component';
import { StockComponent } from './Pages/stock/stock.component';
import { OrdersComponent } from './Pages/orders/orders.component';


@NgModule({
  declarations: [
    FooterComponent, 
    HeaderComponent, 
    SidenavComponent,
    RequestsComponent,
    DashboardComponent,
    StaffComponent,
    StockComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RequestsRoutingModule
  ]
})
export class RequestsModule { }
