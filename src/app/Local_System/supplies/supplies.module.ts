import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliesRoutingModule } from './supplies-routing.module';
import { SuppliesComponent } from './supplies.component';
import { HeaderComponent } from './Layouts/Header/header.component';
import { SidenavComponent } from './Layouts/Sidenav/sidenav.component';
import { FooterComponent } from './Layouts/Footer/footer.component';
import { MaterialModule } from 'src/app/material-modules';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ManagesuppliersComponent } from './Pages/managesuppliers/managesuppliers.component';
import { ManagesuppliesComponent } from './Pages/managesupplies/managesupplies.component';
import { RequestsComponent } from './Pages/requests/requests.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { StoreComponent } from './Pages/store/store.component';


@NgModule({
  declarations: [
    FooterComponent, 
    HeaderComponent, 
    SidenavComponent,
    SuppliesComponent,
    DashboardComponent,
    ManagesuppliersComponent,
    ManagesuppliesComponent,
    RequestsComponent,
    OrdersComponent,
    StoreComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SuppliesRoutingModule
  ]
})
export class SuppliesModule { }
