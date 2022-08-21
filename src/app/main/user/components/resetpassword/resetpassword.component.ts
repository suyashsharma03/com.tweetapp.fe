import { Location } from "@angular/common";
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
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit, OnDestroy {
  public resetPassForm: FormGroup;
  public isOldPasswordInvalid = false;
  public isNewPasswordInvalid = false;
  public successMessage = "";
  public errorMessage = "";
  public invalid = false;
  public isSuccess = false;
  public isEmailFormatWrong = false;
  public isPasswordLength = false;
  public isLoggedIn = false;

  private destroy = new Subject<void>();
  private reset: ResetPassword;
  private userId: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<fromApp.TweetAppState>,
    private readonly validationService: ValidationService,
    private readonly translateService: TranslateService,
    private readonly location: Location,
  ) { }

  ngOnInit(): void {
    this.checkIfLoggedIn();
    this.initializeResetPassForm();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private checkIfLoggedIn(): void {
    if(localStorage.getItem("token") || sessionStorage.getItem("token")) {
      this.isLoggedIn = true;
      this.getEmailOfUser();
    }
    else {
      this.isLoggedIn = false;
      this.getEmailFromForgotPassword();
    }
  }

  private getEmailOfUser(): void {
    this.store
      .select(fromApp.AppStates.userState)
      .pipe(takeUntil(this.destroy))
      .subscribe((userState) => { 
        if(userState?.user) {
          this.userId = userState?.user?.emailId;
        }
        else {
          this.store.dispatch(new userActions.RedirectToLogin());
        }
      });
  }

  private getEmailFromForgotPassword(): void {
    this.store
      .select(fromApp.AppStates.userState)
      .pipe(takeUntil(this.destroy))
      .subscribe((userState) => {
        if(userState?.email) {
          this.userId = userState?.email;
        }
        else {
          this.store.dispatch(new userActions.RedirectToLogin());
        }
      });
  }

  private initializeResetPassForm(): void {
    this.resetPassForm = this.formBuilder.group({
      oldPassword: ["", this.isLoggedIn? this.validationService.requiredField : ""],
      newPassword: ["", this.validationService.requiredField],
    });
  }

  public resetPass(): void {
    if(!this.resetPassForm.valid) {
      this.invalid = true;
      this.checkEmptyControl();
      this.errorMessage = this.translateService.instant("registers.generalInvalidMessage") as string;
    }
    else {
      this.invalid = false;
      if(this.checkPasswordLength()){
        if(this.isLoggedIn) {
          this.reset = {
            oldPassword: this.resetPassForm?.value?.oldPassword as string,
            newPassword: this.resetPassForm?.value?.newPassword as string,
            
          };
          this.store.dispatch(new userActions.ResetPasswordAction(this.reset, this.userId));
        }
        else {
          this.reset = {
            oldPassword: "",
            newPassword: this.resetPassForm?.value?.newPassword as string,
          }
          this.store.dispatch(new userActions.ForgotResetPasswordAction(this.reset, this.userId));
        }
        this.isSuccessful();
      }
      else {
        this.errorMessage = this.translateService.instant("passwordReset.passwordLength") as string;
        this.invalid = true;
      }
    }
  }

  private checkEmptyControl(): void {
    if(!this.resetPassForm?.value?.oldPassword) {
      this.isOldPasswordInvalid = true;
    }
    if(!this.resetPassForm?.value?.newPassword) {
      this.isNewPasswordInvalid = true;
    }
  }

  private checkPasswordLength(): boolean {
    if(
      this.resetPassForm?.value?.newPassword?.length < 6 || 
      this.resetPassForm?.value?.newPassword?.length > 20
    ) {
      this.invalid = true;
      this.isPasswordLength = true;
      return false;
    }
    this.invalid = false;
    return true;
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
        if(userState.error && userState?.error?.errorMessage && !userState?.success) {
          this.invalid = true;
          this.errorMessage = userState.error.errorMessage;
        }
        else if(userState?.success && userState?.success?.message) {
          this.isSuccess = true;
          this.successMessage = userState.success.message;
          this.resetPassForm.reset();
          this.resetPassForm.markAsPristine();
          if(!this.isLoggedIn) {
            this.store.dispatch(new userActions.RedirectToLogin());
          }
        }
      });
  }

  public back(): void {
    this.location.back();
  }

}
