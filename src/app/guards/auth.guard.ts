import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { TOKEN_NAME } from '../util/auth.constants';
import {tokenNotExpired} from 'angular2-jwt';
import { take } from 'rxjs/operators/take';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {
  }

  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (tokenNotExpired(TOKEN_NAME, this.userService.accessToken)) {
      return true;
    } else {
      this.router.navigate(['login'], {queryParams: {redirectTo: state.url}});
      return false;
    }
  }*/
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1));
  }
}
