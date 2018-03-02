import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Visitmode } from '../models/visitmode.model';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators/catchError';
import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/share'
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class VisitmodeService {

  private  visitModeUrl = '/visit-mode';

  constructor(private apiService:ApiService,private http:HttpClient) {  }

   getVisitModes() : Observable<Array<{} | Visitmode[]>> {
     //return Observable.of({});
     return this.apiService.get(this.visitModeUrl+'/')
     .pipe(map(data => data))
     /*.do( res => console.log('HTTP response:', res))
            .map(res => res)
      .do(console.log);*/
     ;
   }
}
