import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers.component';
import { FooterComponent } from './Layouts/Footer/footer.component';
import { SidenavComponent } from './Layouts/Sidenav/sidenav.component';
import { HeaderComponent } from './Layouts/Header/header.component';
import { MaterialModule } from 'src/app/material-modules';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { NewOrdersComponent } from './Pages/new-orders/new-orders.component';
import { RejectedOrdersComponent } from './Pages/rejected-orders/rejected-orders.component';
import { ApprovedOrdersComponent } from './Pages/approved-orders/approved-orders.component';


@NgModule({
  declarations: [
    SuppliersComponent,
    FooterComponent, 
    HeaderComponent, 
    SidenavComponent, DashboardComponent, OrdersComponent, NewOrdersComponent, RejectedOrdersComponent, ApprovedOrdersComponent,
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    MaterialModule
  ]
})
export class SuppliersModule { }
