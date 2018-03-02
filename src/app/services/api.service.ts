import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators/catchError';
import { Headers,Http,RequestOptions,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/share'
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {

  constructor(
    private http:HttpClient,
    private jwtService:JwtService
  ) { }

  private formatErrors(error:any){
    console.log(error);
    return new ErrorObservable(error);//new ErrorObservable(error.json());
  }

  get(path:String,params:HttpParams = new HttpParams()): Observable<any>{
    console.log('Params '+params);
    console.log('Resource Url '+environment.resource_url);
    console.log('Path '+path);
    let obs$ : ConnectableObservable<any> = this.http.get(`${environment.resource_url}${path}`)//,{params}
    .pipe(catchError(this.formatErrors))
    //.pipe(map((resp:Response) => console.log(resp)))
    .publishReplay();
    obs$.connect()
    return obs$;
    /*return this.http.get(`${environment.api_url}${path}`,{params})
    .pipe(catchError(this.formatErrors));*/
  }

  put(path:String,body:Object = {}):Observable<any>{
    return this.http.put(`${environment.resource_url}${path}`,JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path:String, body:Object = {}):Observable<any> {  
    return this.http.post(`${environment.resource_url}${path}`,JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path:String):Observable<any> {
    return this.http.delete(`${environment.resource_url}${path}`).pipe(catchError(this.formatErrors));
  }

  login(path:String,params:URLSearchParams,headers:HttpHeaders):Observable<any>{
    console.log("Params >> "+params);
    return this.http.post(`${environment.oauth_server_url}${path}`,params.toString(),{headers:headers})
    .pipe(catchError(this.formatErrors));
  }
}
