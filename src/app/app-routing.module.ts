import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WebsiteComponent } from './website/website.component';
import { AuthGuard } from 'src/@core/helpers/auth.guard';
import { Role } from 'src/@core/Models/role';
import { ModuleGuard } from 'src/@core/helpers/Module.guard';
import { AuthenticatedComponent } from './Auth/authenticated/authenticated.component';


const routes: Routes = [

  //Authentication & Authorisation modules
  // { path: '', component: WebsiteComponent },
  { path: '', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule) },
  { path: 'Auth', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule) },
  //{ path: 'login', redirectTo: '/Auth', pathMatch: 'full' },

  { path: 'Authenticated', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule),
    canLoad: [ModuleGuard],
    data: { roles: [Role.Authenticated] },
  },


  // {
  //   path: 'Authenticated',
  //   component: AuthenticatedComponent, 
  //   canLoad: [ModuleGuard],
  //   data: { roles: [Role.Authenticated] },
  // },


  //global system entrence
  {
    path: 'Staff', loadChildren: () => import('./Global_System/Staffs/staffs.module').then(m => m.StaffsModule),
    canLoad: [ModuleGuard],
    canActivate: [ AuthGuard ],
    data: { preload:true },
  },
  { path: 'Supplier', loadChildren: () => import('./Global_System/Suppliers/suppliers.module').then(m => m.SuppliersModule),
      canLoad: [ModuleGuard],
      data: {preloadingStrategy:true },
   },
  {
    path: 'Vendor', loadChildren: () => import('./Global_System/Vendors/vendors.module').then(m => m.VendorsModule),
    canLoad: [ModuleGuard],
    data: {preloadingStrategy:true , roles: [Role.Vendor] },
  },
  
  //Local System 


  {
    path: 'Admin', loadChildren: () => import('./Local_System/hod/hod.module').then(m => m.hodModule),
    canLoad: [ModuleGuard],
    data: {preloadingStrategy:true },
  },
  { path: 'requests', loadChildren: () => import('./Local_System/requests/requests.module').then(m => m.RequestsModule),
    canLoad: [ModuleGuard],
    canActivate: [ AuthGuard ],
    data: { roles: [Role.requestsManager] },
  },
  { path: 'store', loadChildren: () => import('./Local_System/store/store.module').then(m => m.StoreModule), 
    canLoad: [ModuleGuard],
    canActivate: [ AuthGuard ],
    data: { preloadStrategy: true, roles: [Role.storeManager] }, 
  },
  // { path: 'supplies', loadChildren: () => import('./Local_System/supplies/supplies.module').then(m => m.SuppliesModule),
  
  // },
  { path: 'purchases', loadChildren: () => import('./Local_System/purchases/purchases.module').then(m => m.PurchasesModule),
     canLoad: [ModuleGuard],
     canActivate: [ AuthGuard ],
    data: { roles: [Role.purchasesManager] },
  },
  



  {
    path: '**', component: PageNotFoundComponent
  }


  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes,
    { preloadingStrategy: PreloadAllModules })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
