import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { TOKEN_NAME } from '../util/auth.constants';
import {tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {
  }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean> {

    return this.userService.isUserLoggedIn
    .take(1)
    .map((isLoggedIn:boolean) => {
      console.log('Can activate >>>> '+isLoggedIn);
      if(!isLoggedIn){
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });

    /*return this.userService.isAuthenticated()
    .take(1)
    .map((isLoggedIn) => {
      console.log('Can activate 2nd >>>> '+isLoggedIn);
      if(!isLoggedIn){
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });*/
  }
}
