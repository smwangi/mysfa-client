import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { VisitModeComponent } from './components/visit-mode/visit-mode.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { TOKEN_NAME } from   './util/auth.constants';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import { Http } from '@angular/http';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ShowAuthedDirective } from './directives/show-authed.directive';
import { JwtService } from './services/jwt.service';
import { ApiService } from './services/api.service';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http-token-interceptor';
import { VisitmodeService } from './services/visitmode.service';
import { BaseService } from './services/base.service';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './components/footer/footer.component';

/*export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}*/

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    VisitModeComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    ShowAuthedDirective,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule, 
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    //{provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
    {provide: HTTP_INTERCEPTORS,useClass:HttpTokenInterceptor,multi:true},
    AuthenticationService,
    UserService,
    AuthGuard,
    AdminAuthGuard,
    JwtService,
    ApiService,
    HttpClientModule,
    VisitmodeService,
    BaseService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
