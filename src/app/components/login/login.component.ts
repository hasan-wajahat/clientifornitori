import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {UserService} from "../../services/authentication/user.service";
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {LoginResponse} from "../../model/user/LoginResponse";
import {LoginError} from "../../model/user/LoginError";
import {CommonService} from "../../services/common/common.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CommonService]
})
export class LoginComponent implements OnInit {

  constructor(private _userService:UserService, private fb:FormBuilder) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(54)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(54)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {
  }

  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  private loginResponse = new LoginResponse();
  private error:LoginError;
  private errorMessage:string;

  signIn(){
    console.log("CALLED SIGN IN - Username: " + this.username.value + "  Password: " + this.password.value);

    this._userService.login(this.username.value, this.password.value).subscribe(
      loginResponse => this.loginResponse = loginResponse,
      error => {
        console.log("LOGIN FAILED: " + JSON.stringify(error.json()));
        this.error = error.json();
        this.errorMessage = this.error.detail;
      },
      () => {
        console.log("signIn() - FINISHED! " );

        if(this.loginResponse.token != null){
          this._userService.loggedIn = true;
          sessionStorage.setItem('auth_token', this.loginResponse.token);
          sessionStorage.setItem('UserData', JSON.stringify(this.loginResponse.user));
          console.log("User logged in. Redirect to HOME page!");
          window.location.href = './';
        }

      }
    );
  }

  public onSubmit(values:Object):void {
    console.log("FORM SUBMITTED !");
    this.form.markAsTouched();
    this.submitted = true;
    if (this.form.valid) {
      this.signIn();
    }
  }

}
