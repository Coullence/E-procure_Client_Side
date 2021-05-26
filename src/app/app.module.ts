import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-modules';

import { FlxUiDatatableModule, FlxUiDataTable } from 'flx-ui-datatable';
import { WelcomeModule } from './welcome/welcome.module';
import { hodModule } from './Local_System/hod.module';
import { PurchasesModule } from './Local_System/purchases/purchases.module';
import { RequestsModule } from './Local_System/requests/requests.module';
import { StoreModule } from './Local_System/store/store.module';
import { SuppliesModule } from './Local_System/supplies/supplies.module';
import { StaffsModule } from './Global_System/Staffs/staffs.module';
import { VendorsModule } from './Global_System/Vendors/vendors.module';
import { WebsiteComponent } from './website/website.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/@core/helpers/error.interceptor';
import { JwtInterceptor } from 'src/@core/helpers/jwt.interceptor';
import { ModuleGuard } from 'src/@core/helpers/Module.guard';
import { ExportAsModule } from 'ngx-export-as';
@NgModule({
  declarations: [
    AppComponent,
    WebsiteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    WelcomeModule,
    hodModule,
    PurchasesModule,
    RequestsModule,
    StoreModule,
    SuppliesModule,

    StaffsModule,
    SuppliesModule,
    VendorsModule,
    ExportAsModule

  ],
  providers: [
    FlxUiDataTable,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ModuleGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
