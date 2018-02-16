import { Injectable } from '@angular/core';
import { TOKEN_NAME } from '../util/auth.constants';
import { JwtHelper} from 'angular2-jwt';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged,map} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  isAdmin: boolean;
  constructor(
    private apiService:ApiService,
    private http:HttpClient,
    private jwtService:JwtService
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
     // If JWT detected, attempt to get & store user's info
     if(this.jwtService.getToken()){
       this.apiService.get('/user')
       .subscribe(
         data => this.setAuth(data),
         err => this.purgeAuth()
       );
     } else {
       // Remove any potential remnants of previous auth states
       this.purgeAuth();
     }
  }

  setAuth(user:User){
    console.log('User object >> '+JSON.stringify(user));
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth(){
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(credentials,headers):Observable<User> {
   // const route = (type === 'login') ? '/login' : '';
    return this.apiService.login('/oauth/token',credentials,headers)
    .pipe(map(
      data => {
        this.setAuth(data);//.user
        return data;
      }
    ));
  }

  getCurrentUser():User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  updateUser(user):Observable<User>{
    return this.apiService.put('/user',{user})
    .pipe(map( data => {
      // Update the currentUser observable
      this.currentUserSubject.next(user.data);
      return data.user;
    }))
  }

  login(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    console.log(decodedToken);

    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN_USER');
    this.accessToken = accessToken;

    localStorage.setItem(TOKEN_NAME, accessToken);
  }

  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem(TOKEN_NAME);
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.accessToken && !this.isAdmin;
  }
}
