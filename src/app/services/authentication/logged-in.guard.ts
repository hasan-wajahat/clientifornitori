// logged-in.guard.ts
import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from "../../services/authentication/user.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {}

  canActivate() {
    if(this.user.isLoggedIn()){
      return true;
    }
    else{
      console.log("User non logged. Redirect to login page!");
      this.router.navigate(['/login']);
    }

  }
}
