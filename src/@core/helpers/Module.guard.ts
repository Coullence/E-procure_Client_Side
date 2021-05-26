import { CanLoad, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../Service/authentication.service';
import { state } from '@angular/animations';
 
@Injectable()
export class ModuleGuard implements CanLoad {
  
  constructor(
      
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }
 
  canLoad(route: Route){
    
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            this.router.navigate(['/Auth/login']);
            return false;
        }

    
        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/Auth/login']);
    return false;
  }
} 