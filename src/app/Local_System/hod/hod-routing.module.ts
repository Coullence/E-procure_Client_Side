import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hodComponent } from './hod.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ManageEmployeesComponent } from './Pages/manage-employees/manage-employees.component';
import { ManageStaffsComponent } from './Pages/manage-staffs/manage-staffs.component';
import { ManageRequestsComponent } from './Pages/manage-requests/manage-requests.component';
import { ManageTendersComponent } from './Pages/manage-tenders/manage-tenders.component';
import { ManageStoreComponent } from './Pages/manage-store/manage-store.component';
import { ManageOrdersComponent } from './Pages/manage-orders/manage-orders.component';
import { ManageSuppliersComponent } from './Pages/manage-suppliers/manage-suppliers.component';
import { ManageVendorsComponent } from './Pages/manage-vendors/manage-vendors.component';
import { ManageInvoicesComponent } from './Pages/manage-invoices/manage-invoices.component';
/*dialogs*/
import { UpdateDialogComponent } from './Pages/manage-employees/Dialogs/update-dialog/update-dialog.component';
import { UpdateStaffDialogComponent } from './Pages/manage-staffs/Dialogs/update-staff-dialog/update-staff-dialog.component';
import { UpdateOrderDialogComponent } from './Pages/manage-orders/Dialogs/update-order-dialog/update-order-dialog.component';
import { UpdateRequestDialogComponent } from './Pages/manage-requests/Dialogs/updateRequestDialog/update-request-dialog/update-request-dialog.component';
import { UpdateVendorRequestsComponent } from './Pages/manage-vendors/Dialogs/update-vendor-requests/update-vendor-requests.component';
import { AllUsersComponent } from './Pages/all-users/all-users.component';
import { StaffInformationComponent } from './Pages/manage-staffs/Dialogs/staff-information/staff-information.component';
import { InvoiceComponent } from './Pages/manage-suppliers/Dialogs/invoice/invoice.component';
import { GenerateInvoiceComponent } from './Pages/manage-suppliers/Dialogs/generate-invoice/generate-invoice.component';
import { ViewRequestComponent } from './Pages/manage-requests/Dialogs/view-request/view-request.component';
import { NewEmployeesComponent } from './Pages/manage-employees/new-employees/new-employees.component';
import { GetEmployeeRequestComponent } from './Pages/manage-employees/new-employees/get-employee-request/get-employee-request.component';
import { ManageCategoriesComponent } from './Pages/manage-store/Dialogs/manage-categories/manage-categories.component';
import { UpdateCategoryDialogComponent } from './Pages/manage-store/Dialogs/update-category-dialog/update-category-dialog.component';
import { ProcureAssetsComponent } from './Pages/manage-store/Dialogs/procure-assets/procure-assets.component';
import { AddNewAssetComponent } from './Pages/manage-store/Dialogs/New-Item-Dialog/select-category-dialog/add-new-asset/add-new-asset.component';
import { CategorisedItemsComponent } from './Pages/manage-store/categorised-items/categorised-items.component';
import { AddTenderComponent } from './Pages/manage-tenders/add-tender/add-tender.component';
import { TenderRequestsComponent } from './Pages/tender-requests/tender-requests.component';
import { ViewTenderRequestComponent } from './Pages/tender-requests/view-tender-request/view-tender-request.component';
import { PurchaseInvoiceComponent } from './Pages/manage-invoices/purchase-invoice/purchase-invoice.component';
import { ViewOrderComponent } from './Pages/manage-store/view-order/view-order.component';
import { ViewSuppliersDetailComponent } from './Pages/manage-suppliers/view-suppliers-detail/view-suppliers-detail.component';
import { PlacePurchaseOrderComponent } from './Pages/manage-suppliers/place-purchase-order/place-purchase-order.component';

const routes: Routes = [{
   path: '', 
   component: hodComponent,
   children: [
    {
      path: '',
      component: DashboardComponent,
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    // Manage Employees
    {
      path: 'manageemployees', 
      component: ManageEmployeesComponent,
    },
    {
      path: 'newemployees', 
      component: NewEmployeesComponent ,
    },
    {
      path: 'manageorders',
      component:  ManageOrdersComponent,
    },
    {
      path: 'managesuppliers',
      component: ManageSuppliersComponent,
    },
    {
      path: 'manageinvoices',
      component: ManageInvoicesComponent,
    },
   
    {
      path: 'managestaffs',
      component: ManageStaffsComponent,
    },
    {
      path: 'managerequests',
      component: ManageRequestsComponent,
    },
    {
      path: 'managetenders',
      component: ManageTendersComponent,
    },
    {
      path: 'tenderrequest',
      component: TenderRequestsComponent,
    },
    {
      path: 'managestore',
      component: ManageStoreComponent,
    },
     {
      path: 'manage_categories',
      component: ManageCategoriesComponent,
    },
    {
      path: 'managevendors', 
      component: ManageVendorsComponent, 
    },
    {
      path: 'allRegisteredUsers', 
      component: AllUsersComponent, 
    },

    ///dialogs 
    {
      path: 'updateEmployee/:id', 
      component: UpdateDialogComponent, 
    },
    {
      path: 'getEmployeeRequest/:id', 
      component: GetEmployeeRequestComponent, 
    },
     {
      path: 'staffInformation/:id', 
      component: StaffInformationComponent, 
    },
     {
      path: 'updateOrder/:id', 
      component: UpdateOrderDialogComponent, 
    },

    {
      path: 'updateRequest/:id', 
      component: UpdateRequestDialogComponent, 
    },
    {
      path: 'updateTenderReq/:id',
      component: UpdateVendorRequestsComponent, 
    },
    {
      path: 'generateInvoice/:id',
      component: GenerateInvoiceComponent , 
    },
    {
      path: 'viewRequest/:id',
      component: ViewRequestComponent , 
    },


    {
      path: 'procure/new/items/:id',
      component: PlacePurchaseOrderComponent  , 
    },

    
    
    
    {
      path: 'order/status/:id',
      component:ViewOrderComponent , 
    },

    {
      path: 'viewTenderRequest/:id',
      component: ViewTenderRequestComponent , 
    },

    {
      path: 'information/supplier/:id',
      component:ViewSuppliersDetailComponent, 
    },
    // ViewSuppliersDetailComponent
    
    {
      path: 'generate/invoice/:id',
      component: PurchaseInvoiceComponent, 
    },
    {
      path: 'invoice/:id',
      component: InvoiceComponent  , 
    },
    {
      path: 'manage_categories/update_category/:id',
      component: UpdateCategoryDialogComponent  , 
    },
    {
      path: 'manage_items/procure/:id',
      component: ProcureAssetsComponent , 
    },
    {
      path: 'procure/new_item/:id',
      component: AddNewAssetComponent , 
    },
    {
      path: 'categorised/items_data/:id',
      component: CategorisedItemsComponent , 
    },
    {
      path: 'tenders/post/new/:id',
      component: AddTenderComponent , 
    },


  ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class hodRoutingModule { }
