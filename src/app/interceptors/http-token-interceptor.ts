import { Injectable, Injector } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpRequest,HttpHandler,HttpEventType, HttpResponse,HttpErrorResponse  } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    constructor(private jwtService: JwtService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {
            'Content-Type': 'application/json',//'application/x-www-form-urlencoded; charset=utf-8',//'application/json',
            'Accept': 'application/json'
          };
      
          const token = this.jwtService.getToken();
          
          if (token) {
            headersConfig['Authorization'] = `Bearer ${token}`;
            const authReq = req.clone({ setHeaders: headersConfig });
            console.log(authReq);
            return next.handle(authReq).do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  // do stuff with response if you want
                }
              }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status === 401 || err.status === 403 || err.status === 404 ) {
                    console.log("handle error here "+ err.message);
          
                  }
                }
              });
          }
          return next.handle(req);
    }
}
