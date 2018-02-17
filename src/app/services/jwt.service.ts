import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  constructor() { }

  getToken():string {
    return window.localStorage['access_token'];//['jwtToken'];
  }

  saveToken(token:String){
    window.localStorage['access_token'] = token;
  }

  destroyToken(){
    window.localStorage.removeItem('access_token');
  }
}
