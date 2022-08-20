import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";
import { ValidationService } from "../../../../shared/services/validation.service";
import * as fromApp from "../../../../store/tweetapp.reducer";
import { ResetPassword } from "../../model/login.model";
import * as userActions from "../../store/user.action";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"]
})
export class ForgotComponent implements OnInit, OnDestroy {

  public forgetPassForm: FormGroup;
  public isOldPasswordInvalid = false;
  public isNewPasswordInvalid = false;
  public isEmailInvalid = false;
  public successMessage = "";
  public errorMessage = "";
  public invalid = false;
  public isSuccess = false;
  public isEmailFormatWrong = false;
  public isPasswordLength = false;

  private destroy = new Subject<void>();
  private forgot: ResetPassword;
  private userId: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<fromApp.TweetAppState>,
    private readonly validationService: ValidationService,
    private readonly translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.initializeForgotPassForm();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.clearStorage();
  }

  private initializeForgotPassForm(): void {
    this.forgetPassForm = this.formBuilder.group({
      email: ["", this.validationService.requiredField],
      oldPassword: ["", this.validationService.requiredField],
      newPassword: ["", this.validationService.requiredField],
    });
  }

  private clearStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  public resetPass(): void {
    if(!this.forgetPassForm.valid) {
      this.invalid = true;
      this.checkEmptyControl();
      this.errorMessage = this.translateService.instant("registers.generalInvalidMessage") as string;
    }
    else {
      this.invalid = false;
      if(this.checkEmailFormat()) {
        if(this.checkPasswordLength()){
          this.forgot = {
            oldPassword: this.forgetPassForm?.value?.oldPassword as string,
            newPassword: this.forgetPassForm?.value?.newPassword as string,
            
          };
          this.userId = this.forgetPassForm?.value?.email as string;
          this.store.dispatch(new userActions.ForgetPassword(this.forgot, this.userId));
          this.isSuccessful();
        }
        else {
          this.errorMessage = this.translateService.instant("forgotPassword.passwordLength") as string;
          this.invalid = true;
        }
      }
      else {
        this.errorMessage = this.translateService.instant("registers.emailFormatWrong") as string;
        this.invalid = true;
      }
    }
  }

  private checkEmptyControl(): void {
    if(!this.forgetPassForm?.value?.email) {
      this.isEmailInvalid = true;
    }
    if(!this.forgetPassForm?.value?.oldPassword) {
      this.isOldPasswordInvalid = true;
    }
    if(!this.forgetPassForm?.value?.newPassword) {
      this.isNewPasswordInvalid = true;
    }
  }

  private checkPasswordLength(): boolean {
    if(
      this.forgetPassForm?.value?.newPassword?.length < 6 || 
      this.forgetPassForm?.value?.newPassword?.length > 20
    ) {
      this.invalid = true;
      this.isPasswordLength = true;
      return false;
    }
    this.invalid = false;
    return true;
  }

  private checkEmailFormat(): boolean {
    const emailString: string = this.forgetPassForm?.value?.email;
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailString)) {
      return true;
    }
    else {
      this.isEmailFormatWrong = true;
      return false;
    }
  }

  public isValidFalse(): void {
    this.invalid = false;
    this.isSuccess = false;
  }

  public goToLogin(): void {
    this.store.dispatch(new userActions.RedirectToLogin());
  }

  private isSuccessful(): void {
    this.store
      .select(fromApp.AppStates.userState)
      .pipe(takeUntil(this.destroy))
      .subscribe((userState) => { 
        if(userState.error) {
          this.invalid = true;
          this.errorMessage = userState.error.errorMessage;
        }
        else if(userState.success) {
          this.isSuccess = true;
          this.successMessage = userState.success.message;
          this.forgetPassForm.reset();
          this.forgetPassForm.markAsPristine();
        }
      });
  }
}
