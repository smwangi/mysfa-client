import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AppdataService {

  constructor(private http: AuthHttp) { }

  getUsers() {
    return this.http.get('/springjwt/users').map(res => res.json());
  }
}
