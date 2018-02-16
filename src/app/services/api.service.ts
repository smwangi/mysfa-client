import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators/catchError';
import { Headers,Http,RequestOptions,URLSearchParams } from '@angular/http';

@Injectable()
export class ApiService {

  constructor(
    private http:HttpClient,
    private jwtService:JwtService
  ) { }

  private formatErrors(error:any){
    return new ErrorObservable(error.json());
  }

  get(path:String,params:HttpParams = new HttpParams()): Observable<any>{
    return this.http.get(`${environment.api_url}${path}`,{params})
    .pipe(catchError(this.formatErrors));
  }

  put(path:String,body:Object = {}):Observable<any>{
    return this.http.put(`${environment.api_url}${path}`,JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path:String, body:Object = {}):Observable<any> {  
    return this.http.post(`${environment.api_url}${path}`,JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path:String):Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`).pipe(catchError(this.formatErrors));
  }

  login(path:String,params:URLSearchParams,headers:HttpHeaders):Observable<any>{
    console.log("Params >> "+params);
    return this.http.post(`${environment.api_url}${path}`,params.toString(),{headers:headers})
    .pipe(catchError(this.formatErrors));
  }
}
