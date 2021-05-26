import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/@core/helpers/auth.guard';
import { Role } from 'src/@core/Models/role';
import { ModuleGuard } from 'src/@core/helpers/Module.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { ActivateComponent } from './activate/activate.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';


const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: '',
      component: LoginComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },

    {
      path: 'Sign_Up',
      component: SignUpComponent,
    },
    {
      path: 'Need_Activation',
      component: AccountActivationComponent,
    },

    {
      path: 'Authenticated',
      component: AuthenticatedComponent,
    },

    {
      path: 'activate/token/:{token}',
      component: ActivateComponent,
    },

    {
      path: 'Reset_Password',
      component: ResetPasswordComponent,
    },


   
    {
      path: 'Set_New_Password/token/:{token}',
      component: NewPasswordComponent,
    },



  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
