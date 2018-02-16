import { Injectable, Injector } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpRequest,HttpHandler } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    constructor(private jwtService: JwtService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          };
      
          const token = this.jwtService.getToken();
      
          if (token) {
            headersConfig['Authorization'] = `Token ${token}`;
            const authReq = req.clone({ setHeaders: headersConfig });
            return next.handle(authReq);
          }
          return next.handle(req);
    }
}