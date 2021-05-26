import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesComponent } from './purchases.component';
import { MaterialModule } from 'src/app/material-modules';
import { FooterComponent } from './Layouts/Footer/footer.component';
import { HeaderComponent } from './Layouts/Header/header.component';
import { SidenavComponent } from './Layouts/Sidenav/sidenav.component';
import { SuppliersComponent } from './Pages/suppliers/suppliers.component';
import { StockComponent } from './Pages/stock/stock.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    FooterComponent, 
    HeaderComponent, 
    SidenavComponent,
    PurchasesComponent,
    SuppliersComponent,
    StockComponent,
    OrdersComponent,
    DashboardComponent,
  ],
  exports:[

  ],
  imports: [
    CommonModule,
    MaterialModule,
    PurchasesRoutingModule
  ]
})
export class PurchasesModule { }
