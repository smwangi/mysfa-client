import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Errors } from '../../models/errors.model';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { TOKEN_CLIENT_ID, TOKEN_CLIENT_SECRET, TOKEN_GRANT_TYPE } from '../../util/auth.constants';
import { HttpHeaders,HttpParams } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  redirectUrl: string;
  errors: Errors = {errors: {}};
  isSubmitting = false;

  public loginFrm:FormGroup;//public driven form : Model driven
  public submitted: boolean;//keep track if form is submitted
  public events: any[] = []; // use later to display form changes
  

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private fb:FormBuilder) {
                
                this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
               
               }

  ngOnInit(): void {
    this.userService.logout();
    this.loginFrm = this.fb.group({
      'username': ['',[<any>Validators.required,<any>Validators.minLength(4)]],
      'password': ['',[<any>Validators.required,<any>Validators.minLength(4)]]
    });
  }

  login(){
    this.isSubmitting = true;
    this.errors = {errors: {}};
    const credentials = this.loginFrm.value;
    credentials.grant_type = TOKEN_GRANT_TYPE;

    let params = new URLSearchParams();
    params.append('username','user');
    params.append('password','password');
    params.append('grant_type',TOKEN_GRANT_TYPE);

    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa(TOKEN_CLIENT_ID+":"+TOKEN_CLIENT_SECRET)});
    this.userService
    .attemptAuth(params,headers)
    .subscribe(
      data => this.router.navigate(['/']),//this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
  /*login(model:User,isValid:boolean) {
    this.loading = true;

    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        result => {
          this.loading = false;

          if (result) {
            this.userService.login(result);
            this.navigateAfterSuccess();
          } else {
            this.error = 'Username or password is incorrect';
          }
        },
        error => {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      );
      console.log(model,isValid);
  }*/

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/']);
    }
  }
}
