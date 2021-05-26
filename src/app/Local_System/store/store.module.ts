import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { FooterComponent } from './Layouts/Footer/footer.component';
import { HeaderComponent } from './Layouts/Header/header.component';
import { SidenavComponent } from './Layouts/Sidenav/sidenav.component';
import { MaterialModule } from 'src/app/material-modules';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { SuppliersComponent } from './Pages/suppliers/suppliers.component';
import { TendersComponent } from './Pages/tenders/tenders.component';
import { RequestsComponent } from './Pages/requests/requests.component';
import { ManageStoreComponent } from './Pages/manage-store/manage-store.component';


@NgModule({
  declarations: [
    FooterComponent, 
    HeaderComponent, 
    SidenavComponent,
    StoreComponent,
    DashboardComponent,
    OrdersComponent,
    SuppliersComponent,
    TendersComponent,
    RequestsComponent,
    ManageStoreComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
