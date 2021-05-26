import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { MaterialModule } from '../material-modules';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/@core/helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/@core/helpers/error.interceptor';
import { ActivateComponent } from './activate/activate.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { UpdateDialogComponent } from './account-profile/update-dialog/update-dialog.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';


@NgModule({
  declarations: [AuthComponent,LoginComponent,ActivateComponent, ResetPasswordComponent, NewPasswordComponent, SignUpComponent, AccountActivationComponent, AccountProfileComponent, UpdateDialogComponent, AuthenticatedComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    
],
})
export class AuthModule { }
