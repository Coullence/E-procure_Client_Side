import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { StaffRequestComponent } from './staff-request/staff-request.component';
import { SupplierRequestComponent } from './supplier-request/supplier-request.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';

// Dialogs
import { UpdateAccountDialogComponent } from './Shared/update-account-dialog/update-account-dialog.component';

const routes: Routes = [{
 path: '',
 component: WelcomeComponent,  children: [
    {
      path: '',
      component: WelcomePageComponent,
    },
    {
      path: 'RequestasStaff',
      component: StaffRequestComponent,
    },
    {
      path: 'RequestasSupplier',
      component: SupplierRequestComponent,
    },
    {
      path: 'RequestasEmployee',
      component: EmployeeRequestComponent,
    },
    // // Dialogs
        {
      path: 'updateAccount/', 
      component: UpdateAccountDialogComponent, 
    },

    // {
    //   path: 'updateAccount/:id', 
    //   component: UpdateAccountDialogComponent, 
    // },



  ],

  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
