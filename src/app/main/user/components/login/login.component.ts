import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { ValidationService } from "../../../../shared/services/validation.service";
import * as fromApp from "../../../../store/tweetapp.reducer";
import { UserLogin } from "../../model/login.model";
import * as userActions from "../../store/user.action";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public isInvalid = false;
  public isEmailInvalid = false;
  public isPasswordInvalid = false;
  public errorFromApi = false;
  public errorMessage: string;

  private userLogin: UserLogin;
  private destroy = new Subject<void>();

  constructor(
    private readonly store: Store<fromApp.TweetAppState>,
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.clearStorage();
  }

  private initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", this.validationService.requiredField],
      password: ["", this.validationService.requiredField]
    });
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
      this.store.dispatch(new userActions.FetchLogin(this.userLogin));
      this.store
      .select(fromApp.AppStates.userState)
      .pipe(takeUntil(this.destroy))
      .subscribe((userState) => { 
        if(userState.error){
          this.errorFromApi = true;
          this.errorMessage = userState.error.errorMessage;
        }
      });
    }
  }

  private checkEmptyControl(): void {
    if(!this.loginForm?.value?.email) {
      this.isEmailInvalid = true;
    }
    if(!this.loginForm?.value?.password) {
      this.isPasswordInvalid = true;
    }
  }

  public goToForgotPass(): void {
    this.store.dispatch(new userActions.RedirectToForgotPassword());
  }

  private clearStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
