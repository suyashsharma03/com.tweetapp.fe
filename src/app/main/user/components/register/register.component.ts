import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Constants } from "../../../../shared/constants/constants";
import { ValidationService } from "../../../../shared/services/validation.service";
import { UserRegistration } from "../../model/register.model";
import * as userActions from "../../store/user.action";
import * as fromApp from "../../../../store/tweetapp.reducer";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public securityQuestions: string[] = Constants.securityQuestions;
  public isInvalid = false;
  public isFirstNameEmpty = false;
  public isLastNameEmpty = false;
  public isEmailEmpty = false;
  public isPhoneEmpty = false;
  public isPasswordEmpty = false;
  public isConfPasswordEmpty = false;
  public isDobEmpty = false;
  public isSecurityAnswerEmpty = false;
  public isEmailFormatWrong = false;
  public isPhoneFormatWrong = false;
  public isPasswordLength = false;
  public invalidText: string;

  private userRegistration: UserRegistration;
  private destroy = new Subject<void>();

  constructor(
    private readonly store: Store<fromApp.TweetAppState>,
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
    private readonly translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ["", this.validationService.requiredField],
      lastName: ["", this.validationService.requiredField],
      email: ["", this.validationService.requiredField],
      phone: ["", this.validationService.requiredField],
      password: ["", this.validationService.requiredField],
      confirmPassword: ["", this.validationService.requiredField],
      dob: ["", this.validationService.requiredField],
      gender: ["1"],
      securityQuestion: [""],
      securityAnswer: ["", this.validationService.requiredField],
    })
  }

  public goToLogin(): void {
    this.store.dispatch(new userActions.RedirectToLogin());
  }

  public register(): void {
    if(!this.registerForm.valid) {
      this.isInvalid = true;
      this.checkFormControlEmpty();
      this.invalidText = this.translateService.instant("registers.generalInvalidMessage") as string;
    }
    else {
      if(this.checkPasswordLength){
        const valid: boolean = this.comparePassword();
        if(valid) {
          if(this.checkEmailFormat()) {
            if(this.checkPhoneFormat()) {
              const genderValue: string = this.getGender();
              if(genderValue) {
                this.userRegistration = {
                  firstName: this.registerForm?.value?.firstName,
                  lastName: this.registerForm?.value?.lastName,
                  emailId: this.registerForm?.value?.email,
                  phone: this.registerForm?.value?.phone,
                  password: this.registerForm?.value?.password,
                  confirmPassword: this.registerForm?.value?.confirmPassword,
                  dateofbirth: this.registerForm?.value?.dob,
                  gender: genderValue,
                  securityQuestion: this.registerForm?.value?.securityQuestion,
                  securityAnswer: this.registerForm?.value?.securityAnswer,
                }
                this.store.dispatch(new userActions.FetchUserDetails(this.userRegistration));
                this.errorOccurred();
              }
              else {
                this.invalidText = this.translateService.instant("registers.noGenderValue") as string;
                this.isInvalid = true;
              }
            }
            else {
              this.invalidText = this.translateService.instant("registers.phoneFormatWrong") as string;
              this.isInvalid = true;
            }
          }
          else {
            this.invalidText = this.translateService.instant("registers.emailFormatWrong") as string;
            this.isInvalid = true;
          }
        }
        else {
          this.invalidText = this.translateService.instant("registers.passwordDoNotMatch") as string;
          this.isInvalid = true;
        }
      }
      else {
        this.invalidText = this.translateService.instant("forgotPassword.passwordLength") as string;
        this.isInvalid = true;
      }
    }
  }

  private comparePassword(): boolean {
    if(this.registerForm?.value?.password === this.registerForm?.value?.confirmPassword){
      return true;
    }
    else {
      return false;
    }
  }

  private getGender(): string {
    switch(this.registerForm?.value?.gender) {
      case "1":
        return "Female";
      case "2":
        return "Male";
      case "3":
        return "Other";
      default:
        return null;
    }
  }

  private checkFormControlEmpty(): void {
    if(!this.registerForm?.value?.firstName) {
      this.isFirstNameEmpty = true;
    }
    if(!this.registerForm?.value?.lastName) {
      this.isLastNameEmpty = true;
    }
    if(!this.registerForm?.value?.email) {
      this.isEmailEmpty = true;
    }
    if(!this.registerForm?.value?.phone) {
      this.isPhoneEmpty = true;
    }
    if(!this.registerForm?.value?.password) {
      this.isPasswordEmpty = true;
    }
    if(!this.registerForm?.value?.confirmPassword) {
      this.isConfPasswordEmpty = true;
    }
    if(!this.registerForm?.value?.dob) {
      this.isDobEmpty = true;
    }
    if(!this.registerForm?.value?.securityAnswer) {
      this.isSecurityAnswerEmpty = true;
    }
  }

  private checkEmailFormat(): boolean {
    const emailString: string = this.registerForm?.value?.email;
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailString)) {
      return true;
    }
    else {
      this.isEmailFormatWrong = true;
      return false;
    }
  }

  private checkPhoneFormat(): boolean {
    const mobile: string = this.registerForm?.value?.phone;
    if(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g.test(mobile)) {
      return true;
    }
    else {
      this.isPhoneFormatWrong = true;
      return false;
    }
  }

  private checkPasswordLength(): boolean {
    if(
      this.registerForm?.value?.password?.length < 6 || 
      this.registerForm?.value?.password?.length > 20
    ) {
      this.isInvalid = true;
      this.isPasswordLength = true;
      return false;
    }
    this.isInvalid = false;
    return true;
  }

  public removeInvalid(): boolean {
    return false;
  }

  public isValidFalse(): void {
    this.isInvalid = false;
  }

  private errorOccurred(): void {
    this.store
      .select(fromApp.AppStates.userState)
      .pipe(takeUntil(this.destroy))
      .subscribe((userState) => { 
        if(userState?.error){
          this.isInvalid = true;
          this.invalidText = userState?.error?.errorMessage;
        }
      });
  }
}
