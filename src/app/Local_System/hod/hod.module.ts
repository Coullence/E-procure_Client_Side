import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportAsModule } from 'ngx-export-as';

import { hodRoutingModule } from './hod-routing.module';
import { hodComponent } from './hod.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ManageEmployeesComponent } from './Pages/manage-employees/manage-employees.component';
import { ManageStaffsComponent } from './Pages/manage-staffs/manage-staffs.component';
import { ManageRequestsComponent } from './Pages/manage-requests/manage-requests.component';
import { ManageTendersComponent } from './Pages/manage-tenders/manage-tenders.component';
import { ManageVendorsComponent } from './Pages/manage-vendors/manage-vendors.component';
import { ManageSuppliersComponent } from './Pages/manage-suppliers/manage-suppliers.component';
import { ManageSuppliesComponent } from './Pages/manage-supplies/manage-supplies.component';
import { ManageStoreComponent } from './Pages/manage-store/manage-store.component';
import { MaterialModule } from 'src/app/material-modules';
import { FooterComponent } from './Layouts/Footer/footer.component';
import { HeaderComponent } from './Layouts/Header/header.component';
import { SidenavComponent } from './Layouts/Sidenav/sidenav.component';
import { LineGraphComponent } from './Pages/dashboard/widgets/graphs/line-graph/line-graph.component';
import { EmployeesComponent } from './Pages/dashboard/widgets/tables/employees/employees.component';
import { StaffsComponent } from './Pages/dashboard/widgets/tables/staff/staff.component';
import { AddEmployeeComponent } from './Pages/dashboard/dialogs/add-employee/add-employee.component';
import { AddStaffComponent } from './Pages/dashboard/dialogs/add-staff/add-staff.component';
import { AddTenderComponent } from './Pages/manage-tenders/add-tender/add-tender.component';
import { ViewComponent } from './Pages/manage-tenders/view/view.component';
import { SuppliersComponent } from './Pages/dashboard/widgets/tables/suppliers/suppliers.component';
import { SuppliesComponent } from './Pages/dashboard/widgets/tables/supplies/supplies.component';
import { StoreComponent } from './Pages/dashboard/widgets/tables/store/store.component';
import { OrdersComponent } from './Pages/dashboard/widgets/tables/orders/orders.component';
import { TendersComponent } from './Pages/dashboard/widgets/tables/tenders/tenders.component';
import { VendorsComponent } from './Pages/dashboard/widgets/tables/vendors/vendors.component';
import { ManageOrdersComponent } from './Pages/manage-orders/manage-orders.component';
import { RegDialogComponent } from './Pages/manage-employees/Dialogs/reg-dialog/reg-dialog.component';
import { UpdateDialogComponent } from './Pages/manage-employees/Dialogs/update-dialog/update-dialog.component';
import { UpdateRequestDialogComponent } from './Pages/manage-requests/Dialogs/updateRequestDialog/update-request-dialog/update-request-dialog.component';
import { UpdateVendorRequestsComponent } from './Pages/manage-vendors/Dialogs/update-vendor-requests/update-vendor-requests.component';
import { UpdateStaffDialogComponent } from './Pages/manage-staffs/Dialogs/update-staff-dialog/update-staff-dialog.component';
import { UpdateOrderDialogComponent } from './Pages/manage-orders/Dialogs/update-order-dialog/update-order-dialog.component';
import { CreateOrderDialogComponent } from './Pages/manage-orders/Dialogs/create-order-dialog/create-order-dialog.component';
import { AllUsersComponent } from './Pages/all-users/all-users.component';
import { UserInformationComponent } from './Pages/all-users/Dialogs/user-information/user-information.component';
import { StaffInformationComponent } from './Pages/manage-staffs/Dialogs/staff-information/staff-information.component';
import { WidgetComponent } from './Pages/manage-staffs/Dialogs/widget/widget.component';
import { GenerateInvoiceComponent } from './Pages/manage-suppliers/Dialogs/generate-invoice/generate-invoice.component';
import { InvoiceComponent } from './Pages/manage-suppliers/Dialogs/invoice/invoice.component';
import { ManageInvoicesComponent } from './Pages/manage-invoices/manage-invoices.component';
import { UpdateAsEmployeeComponent } from './Pages/all-users/Dialogs/update-as-employee/update-as-employee.component';
import { RejectRequestDialogComponent } from './Pages/manage-employees/Dialogs/reject-request-dialog/reject-request-dialog.component';
import { NewEmployeeRequestsComponent } from './Pages/manage-employees/Dialogs/new-employee-requests/new-employee-requests.component';
import { ViewRequestComponent } from './Pages/manage-requests/Dialogs/view-request/view-request.component';
import { NewEmployeesComponent } from './Pages/manage-employees/new-employees/new-employees.component';
import { GetEmployeeRequestComponent } from './Pages/manage-employees/new-employees/get-employee-request/get-employee-request.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddCategoryDialogComponent } from './Pages/manage-store/Dialogs/add-category-dialog/add-category-dialog.component';
import { ManageCategoriesComponent } from './Pages/manage-store/Dialogs/manage-categories/manage-categories.component';
import { UpdateCategoryDialogComponent } from './Pages/manage-store/Dialogs/update-category-dialog/update-category-dialog.component';
import { ProcureAssetsComponent } from './Pages/manage-store/Dialogs/procure-assets/procure-assets.component';
import { SelectCategoryDialogComponent } from './Pages/manage-store/Dialogs/New-Item-Dialog/select-category-dialog/select-category-dialog.component';
import { AddNewAssetComponent } from './Pages/manage-store/Dialogs/New-Item-Dialog/select-category-dialog/add-new-asset/add-new-asset.component';
import { CategorisedItemsComponent } from './Pages/manage-store/categorised-items/categorised-items.component';
import { SelectCategoryComponent } from './Pages/manage-tenders/select-category/select-category.component';
import { CategoriesComponent } from './Pages/dashboard/widgets/tables/categories/categories.component';
import { StaffrequestsComponent } from './Pages/dashboard/widgets/tables/staffrequests/staffrequests.component';
import { UpdateTenderComponent } from './Pages/manage-tenders/update-tender/update-tender.component';
import { TenderRequestsComponent } from './Pages/tender-requests/tender-requests.component';
import { ViewTenderRequestComponent } from './Pages/tender-requests/view-tender-request/view-tender-request.component';
import { PurchaseInvoiceComponent } from './Pages/manage-invoices/purchase-invoice/purchase-invoice.component';
import { ViewOrderComponent } from './Pages/manage-store/view-order/view-order.component';
import { ViewSuppliersDetailComponent } from './Pages/manage-suppliers/view-suppliers-detail/view-suppliers-detail.component';
import { PlaceOrderComponent } from './Pages/manage-suppliers/view-suppliers-detail/place-order/place-order.component';
import { PlacePurchaseOrderComponent } from './Pages/manage-suppliers/place-purchase-order/place-purchase-order.component';


@NgModule({
  declarations: [
    hodComponent, 
    DashboardComponent, 
    ManageEmployeesComponent, 
    ManageStaffsComponent, 
    ManageRequestsComponent, 
    ManageTendersComponent, 
    ManageVendorsComponent, 
    ManageSuppliersComponent, 
    ManageSuppliesComponent, 
    ManageStoreComponent, 
    FooterComponent, 
    HeaderComponent, 
    SidenavComponent,
    StaffsComponent,
    AddEmployeeComponent,
    AddStaffComponent,
    AddTenderComponent,
    ViewComponent,
    SuppliersComponent,
    SuppliesComponent,
    StoreComponent,
    OrdersComponent,
    TendersComponent,
    VendorsComponent,

    //widgets
    LineGraphComponent,
    EmployeesComponent,
    OrdersComponent,
    StaffsComponent,
    StoreComponent,
    SuppliersComponent,
    SuppliesComponent,
    TendersComponent,
    VendorsComponent,
    ManageOrdersComponent,
    ManageStaffsComponent,
    RegDialogComponent,
    UpdateDialogComponent,
    UpdateRequestDialogComponent,
    UpdateVendorRequestsComponent,
    UpdateStaffDialogComponent,
    UpdateOrderDialogComponent,
    CreateOrderDialogComponent,
    AllUsersComponent,
    UserInformationComponent,
    StaffInformationComponent,
    WidgetComponent,
    GenerateInvoiceComponent,
    InvoiceComponent,
    ManageInvoicesComponent,
    UpdateAsEmployeeComponent,
    RejectRequestDialogComponent,
    NewEmployeeRequestsComponent,
    ViewRequestComponent,
    NewEmployeesComponent,
    GetEmployeeRequestComponent,
    AddCategoryDialogComponent,
    ManageCategoriesComponent,
    UpdateCategoryDialogComponent,
    ProcureAssetsComponent,
    SelectCategoryDialogComponent,
    AddNewAssetComponent,
    CategorisedItemsComponent,
    SelectCategoryComponent,
    CategoriesComponent,
    StaffrequestsComponent,
    UpdateTenderComponent,
    TenderRequestsComponent,
    ViewTenderRequestComponent,
    PurchaseInvoiceComponent,
    ViewOrderComponent,
    ViewSuppliersDetailComponent,
    PlaceOrderComponent,
    PlacePurchaseOrderComponent
  ],
  imports: [
    CommonModule,
    hodRoutingModule,
    MaterialModule,
    ExportAsModule,

  ],

})
export class hodModule { }
