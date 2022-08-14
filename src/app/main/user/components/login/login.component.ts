import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ValidationService } from "../../../../shared/services/validation.service";
import { UserLogin } from "../../model/login.model";
import * as userActions from "../../store/user.action";
import { Router } from "@angular/router";
import { HeaderComponent } from "../../../../shared/component/header/header.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isInvalid = false;
  public isEmailInvalid = false;
  public isPasswordInvalid = false;

  private userLogin: UserLogin;

  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", this.validationService.requiredField],
      password: ["", this.validationService.requiredField]
    })
  }

  public goToRegister(): void {
    this.store.dispatch(new userActions.RedirectToRegistration());
  }

  public login(): void {
    if(!this.loginForm.valid) {
      this.isInvalid = true;
      this.checkEmptyControl();
    }
    else {
      this.userLogin = {
        emailId: this.loginForm?.value?.email,
        password: this.loginForm?.value?.password
      }
      this.isInvalid = false;
      console.log(this.userLogin);
      this.store.dispatch(new userActions.FetchLogin(this.userLogin));
    }
    //this.router.navigate(["/tweet"]);
  }

  private checkEmptyControl(): void {
    if(!this.loginForm?.value?.email) {
      this.isEmailInvalid = true;
    }
    if(!this.loginForm?.value?.password) {
      this.isPasswordInvalid = true;
    }
  }

}
