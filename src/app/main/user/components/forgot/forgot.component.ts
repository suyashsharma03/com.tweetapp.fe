import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";
import { Constants } from "../../../../shared/constants/constants";
import { ValidationService } from "../../../../shared/services/validation.service";
import * as fromApp from "../../../../store/tweetapp.reducer";
import { ForgotPassword } from "../../model/login.model";
import * as userActions from "../../store/user.action";
import { browserRefresh } from "../../../../app.component";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"]
})
export class ForgotComponent implements OnInit {
  
  public forgotPassForm: FormGroup;
  public isEmailInvalid = false;
  public isSecurityAnswerEmpty = false;
  public successMessage: string;
  public errorMessage: string;
  public invalid = false;
  public isEmailFormatWrong = false;
  public securityQuestions: string[] = Constants.securityQuestions;

  private destroy = new Subject<void>();
  private forgot: ForgotPassword;

  constructor(
    private readonly store: Store<fromApp.TweetAppState>,
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
    private readonly translateService: TranslateService
  ) { }

  ngOnInit(): void {
    if(browserRefresh) {
      this.store.dispatch(new userActions.RedirectToLogin());
    }
    this.intializeForgotForm();
  }

  private intializeForgotForm(): void {
    this.forgotPassForm = this.formBuilder.group({
      email: ["", this.validationService.requiredField],
      securityQuestion: [""],
      securityAnswer: ["", this.validationService.requiredField],
    });
  }

  public isValidFalse(): void {
    this.invalid = false;
  }

  public forgotPass(): void {
    if(!this.forgotPassForm.valid) {
      this.invalid = true;
      this.checkFormControlEmpty();
      this.errorMessage = this.translateService.instant("registers.generalInvalidMessage") as string;
    }
    else {
      if(this.checkEmailFormat()) {
        this.forgot = {
          emailId: this.forgotPassForm?.value?.email as string,
          securityQuestion: this.forgotPassForm?.value?.securityQuestion as number,
          securityAnswer: this.forgotPassForm?.value?.securityAnswer as string,
        }
        this.store.dispatch(new userActions.ForgotPasswordAction(this.forgot));
        this.isError();
      }
      else {
        this.errorMessage = this.translateService.instant("registers.emailFormatWrong") as string;
        this.invalid = true;
      }
    }
  }

  private checkFormControlEmpty(): void {
    if(!this.forgotPassForm?.value?.email) {
      this.isEmailInvalid = true;
    }
    if(!this.forgotPassForm?.value?.securityAnswer) {
      this.isSecurityAnswerEmpty = true;
    }
  }

  private checkEmailFormat(): boolean {
    const emailString: string = this.forgotPassForm?.value?.email;
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailString)) {
      return true;
    }
    else {
      this.isEmailFormatWrong = true;
      return false;
    }
  }

  private isError(): void {
    this.store
      .select(fromApp.AppStates.userState)
      .pipe(takeUntil(this.destroy))
      .subscribe((userState) => {
        if(userState.error && userState?.error?.errorMessage) {
          this.invalid = true;
          this.errorMessage = userState.error.errorMessage;
          if(!this.errorMessage) {
            this.errorMessage = this.errorMessage = this.translateService.instant("registers.generalInvalidMessage") as string;
          }
        }
      }
    );
  }


  public goToLogin(): void {
    this.store.dispatch(new userActions.RedirectToLogin());
  }
}
