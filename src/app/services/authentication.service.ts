import { Injectable } from '@angular/core';
import { TOKEN_CLIENT_ID,TOKEN_CLIENT_SECRET } from '../util/auth.constants';
import { Http,Headers, RequestOptions }from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  
  static AUTH_TOKEN = 'http://localhost:8080/oauth/token';

  constructor(private http: Http) { }
  
  login(username: string, password: string):Observable<any> {
    /*const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));
    console.log('Auth Token '+ AuthenticationService.AUTH_TOKEN);
    return this.http.post(AuthenticationService.AUTH_TOKEN, body, {headers})
      .map(res => res.json())
      .map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      });*/

      let params = new URLSearchParams();
    params.append('username',username);
    params.append('password',password);    
    params.append('grant_type','password');
    params.append('testjwtclientid','XY7kmzoNzl100');
    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("fooClientIdPassword:secret")});
    let options = new RequestOptions({ headers: headers });
     
    return this.http.post('http://localhost:8080/sfa/oauth/token', params.toString(), options)
      .map(res => res.json())
      .do(
        data => console.log(data) ,//this.saveToken(data),
        err => alert('Invalid Credentials')); 
  }
}
